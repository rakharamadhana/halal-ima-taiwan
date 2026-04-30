import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { session }, url }) => {
	if (!session) {
		return {
			canReset: false,
			message:
				url.searchParams.get('expired') === 'true'
					? 'Tautan reset sudah kedaluwarsa atau tidak valid. Silakan minta tautan baru.'
					: 'Silakan buka halaman ini dari tautan reset kata sandi yang dikirim ke email Anda.'
		};
	}

	return {
		canReset: true
	};
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase, session } }) => {
		if (!session) {
			return fail(401, {
				success: false,
				message: 'Sesi reset tidak valid. Silakan minta tautan reset baru.'
			});
		}

		const formData = await request.formData();
		const password = String(formData.get('password') || '');
		const confirmPassword = String(formData.get('confirmPassword') || '');

		if (password.length < 8) {
			return fail(400, {
				success: false,
				message: 'Kata sandi minimal 8 karakter.'
			});
		}

		if (password !== confirmPassword) {
			return fail(400, {
				success: false,
				message: 'Konfirmasi kata sandi tidak cocok.'
			});
		}

		const { error } = await supabase.auth.updateUser({
			password
		});

		if (error) {
			return fail(400, {
				success: false,
				message: error.message
			});
		}

		await supabase.auth.signOut();
		redirect(303, '/login?reset=success');
	}
};
