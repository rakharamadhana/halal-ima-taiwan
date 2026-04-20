import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

type ProductRequest = {
	product_name: string;
	brand: string;
	product_category: string;
	estimated_monthly_volume: string;
	production_site: string;
	ingredients?: IngredientRequest[];
};

type IngredientRequest = {
	ingredient_name: string;
	supplier_name: string;
	origin_country: string;
	halal_cert_body: string;
	halal_cert_number: string;
	halal_cert_expiry: string;
	file_name?: string;
};

const allowedScopes = new Set([
	'Warung Makan',
	'Restoran',
	'Supplier Daging',
	'Hotel',
	'Tempat Wisata'
]);

export const load: PageServerLoad = async ({ locals: { user } }) => {
	if (user?.role === 'admin') {
		redirect(303, '/admin');
	}

	return {};
};

export const actions: Actions = {
	registerProduct: async ({ request, locals: { supabase, user } }) => {
		if (!user) {
			redirect(303, '/login');
		}

		const formData = await request.formData();
		const requestedScope = (formData.get('requested_scope') as string)?.trim();
		const productionFlow = (formData.get('production_flow') as string)?.trim();
		const cleaningProcedure = (formData.get('cleaning_procedure') as string)?.trim();
		const qualityControl = (formData.get('quality_control') as string)?.trim();
		const criticalRiskPoints = (formData.get('critical_risk_points') as string)?.trim();

		let products: ProductRequest[] = [];
		let scopeSpecificAnswers: Record<string, string> = {};

		try {
			products = JSON.parse((formData.get('products_json') as string) || '[]');
			scopeSpecificAnswers = JSON.parse((formData.get('scope_specific_json') as string) || '{}');
		} catch {
			return fail(400, {
				success: false,
				message: 'Format data produk atau bahan tidak valid.'
			});
		}

		if (!requestedScope || !allowedScopes.has(requestedScope)) {
			return fail(400, {
				success: false,
				message: 'Pilih kategori scope sertifikasi yang valid terlebih dahulu.'
			});
		}

		if (products.length === 0) {
			return fail(400, {
				success: false,
				message: 'Lengkapi produk terlebih dahulu.'
			});
		}

		const flattenedIngredients = products.flatMap((product) => product.ingredients || []);
		if (flattenedIngredients.length === 0) {
			return fail(400, {
				success: false,
				message: 'Tambahkan minimal satu bahan baku pada produk.'
			});
		}

		const ingredientFiles = formData.getAll('ingredient_cert_files') as File[];
		const ingredientFileNames = ingredientFiles.filter((f) => f?.size > 0).map((f) => f.name);

		const normalizedIngredients = flattenedIngredients.map((ingredient, index) => ({
			...ingredient,
			file_name: ingredientFileNames[index] || ingredient.file_name || ''
		}));

		let ingredientOffset = 0;
		const normalizedProducts = products.map((product) => {
			const productIngredients = product.ingredients || [];
			const normalizedProductIngredients = normalizedIngredients.slice(
				ingredientOffset,
				ingredientOffset + productIngredients.length
			);
			ingredientOffset += productIngredients.length;
			return {
				...product,
				ingredients: normalizedProductIngredients
			};
		});

		const payload = {
			applicant_user_id: user.id,
			company_name: user.company_name || '',
			contact_email: user.email || '',
			requested_scope: requestedScope,
			products: normalizedProducts,
			ingredients: normalizedIngredients,
			halal_control_plan: {
				production_flow: productionFlow || '',
				cleaning_procedure: cleaningProcedure || '',
				quality_control: qualityControl || '',
				critical_risk_points: criticalRiskPoints || ''
			},
			scope_specific_answers: scopeSpecificAnswers,
			status: 'submitted'
		};

		const { error: requestError } = await supabase.from('certification_requests').insert([payload]);
		if (!requestError) {
			return { success: true, message: 'Pengajuan sertifikasi produk berhasil dikirim.' };
		}

		const fallbackMessage = [
			`PERMOHONAN SERTIFIKASI PRODUK (${new Date().toISOString()})`,
			`Perusahaan: ${user.company_name || '-'}`,
			`Email: ${user.email || '-'}`,
			`Ruang lingkup: ${requestedScope}`,
			`Jumlah produk: ${products.length}`,
			`Jumlah bahan: ${normalizedIngredients.length}`,
			'',
			JSON.stringify(payload, null, 2)
		].join('\n');

		const { error: fallbackError } = await supabase.from('contact_inquiries').insert([
			{
				name: user.company_name || user.email || 'Company Applicant',
				email: user.email || 'unknown@example.com',
				subject: 'Permohonan Sertifikasi Produk',
				message: fallbackMessage
			}
		]);

		if (fallbackError) {
			return fail(500, {
				success: false,
				message: 'Pengajuan gagal disimpan. Silakan coba lagi.'
			});
		}

		return {
			success: true,
			message: 'Pengajuan terkirim dan sedang menunggu review auditor.'
		};
	}
};
