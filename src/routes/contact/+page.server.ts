import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals: { supabase }, getClientAddress }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const subject = formData.get('subject') as string;
		const message = formData.get('message') as string;
		const hCaptchaResponse = formData.get('h-captcha-response') as string;

		if (!name || !email || !subject || !message) {
			return fail(400, { error: 'All fields are required' });
		}

		// Check if request is from localhost
		const clientAddress = getClientAddress();
		const isLocalhost = clientAddress === '::1' || clientAddress === '127.0.0.1' || clientAddress === '::ffff:127.0.0.1';

		// Only validate hCaptcha if not on localhost
		if (!isLocalhost) {
			// Validate hCaptcha
			if (!hCaptchaResponse) {
				return fail(400, { error: 'Please complete the hCaptcha verification.' });
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
				return fail(400, { error: 'hCaptcha verification failed. Please try again.' });
			}
		}

		try {
			const { error } = await supabase
				.from('contact_inquiries')
				.insert([{ name, email, subject, message }]);

			if (error) {
				console.error('Supabase error:', error);
				return fail(500, { error: 'Failed to send message. Please try again later.' });
			}

			return { success: true };
		} catch (err) {
			console.error('Action error:', err);
			return fail(500, { error: 'An unexpected error occurred.' });
		}
	}
};
