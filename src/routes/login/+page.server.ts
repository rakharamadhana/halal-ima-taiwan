import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { user }, url }) => {
	if (user) {
		if (user.role === 'admin') redirect(303, '/admin');
		redirect(303, '/dashboard');
	}

	return {
		resetSuccess: url.searchParams.get('reset') === 'success'
	};
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase }, getClientAddress }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const hCaptchaResponse = formData.get('h-captcha-response') as string;
		
		// Check if request is from localhost
		const clientAddress = getClientAddress();
		const isLocalhost = clientAddress === '::1' || clientAddress === '127.0.0.1' || clientAddress === '::ffff:127.0.0.1';

		// Only validate hCaptcha if not on localhost
		if (!isLocalhost) {
			// Validate hCaptcha
			if (!hCaptchaResponse) {
				return fail(400, { message: 'Harap selesaikan verifikasi hCaptcha.', success: false });
			}

			// Verify hCaptcha response (you'll need to implement this with your hCaptcha secret key)
			const hCaptchaSecret = process.env.HCAPTCHA_SECRET_KEY || 'YOUR_HCAPTCHA_SECRET_KEY';
			const hCaptchaVerifyResponse = await fetch('https://api.hcaptcha.com/siteverify', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `secret=${hCaptchaSecret}&response=${hCaptchaResponse}`,
			});

			const hCaptchaResult = await hCaptchaVerifyResponse.json();
			
			if (!hCaptchaResult.success) {
				return fail(400, { message: 'Verifikasi hCaptcha gagal. Silakan coba lagi.', success: false });
			}
		}

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			return fail(400, { message: 'Email atau kata sandi salah', success: false });
		}

		// Perform a server-side redirect to force a fresh request cycle.
		// This ensures hooks.server.ts correctly populates locals.user with the new session data.
		redirect(303, '/dashboard');
	}
};
