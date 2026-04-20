import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { user } }) => {
	if (user) {
		if (user.role === 'admin') redirect(303, '/admin');
		redirect(303, '/dashboard');
	}
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

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
