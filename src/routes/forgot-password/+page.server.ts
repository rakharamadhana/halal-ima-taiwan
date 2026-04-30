import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { user } }) => {
	return {
		user
	};
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase }, url }) => {
		const formData = await request.formData();
		const email = String(formData.get('email') || '').trim();

		if (!email) {
			return fail(400, {
				success: false,
				message: 'Email wajib diisi.'
			});
		}

		const redirectTo = `${url.origin}/reset-password`;
		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo
		});

		if (error) {
			return fail(400, {
				success: false,
				message: error.message
			});
		}

		return {
			success: true,
			message: 'Jika email terdaftar, tautan reset kata sandi akan dikirim ke inbox Anda.'
		};
	}
};
