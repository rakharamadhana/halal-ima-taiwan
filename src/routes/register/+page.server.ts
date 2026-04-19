import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;
		const company_name = formData.get('company_name') as string;
		const pic_name = formData.get('pic_name') as string;
		const phone = formData.get('phone') as string;
		const address = formData.get('address') as string;

		if (password !== confirmPassword) {
			return fail(400, { message: 'Kata sandi tidak cocok', success: false });
		}

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					company_name,
					pic_name,
					phone,
					address
				}
			}
		});

		if (error) {
			return fail(500, { message: error.message, success: false });
		}

		return {
			success: true,
			message: 'Registrasi berhasil! Silakan periksa email Anda untuk verifikasi.'
		};
	}
};
