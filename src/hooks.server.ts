import { createServerClient } from '@supabase/ssr';
import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

const auth: Handle = async ({ event, resolve }) => {
	/**
	 * Initializes the Supabase client for each request.
	 */
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			setAll: (cookiesToSet) => {
				cookiesToSet.forEach(({ name, value, options }) => {
					event.cookies.set(name, value, { ...options, path: '/' });
				});
			}
		}
	});

	/**
	 * Unlike `supabase.auth.getSession()`, which returns the session from the cookie without
	 * verifying it, `safeGetSession()` performs a network request to verify the session.
	 */
	event.locals.safeGetSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		if (!session) return { session: null, user: null };

		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();
		if (error || !user) {
			// JWT is invalid or user not found, clear the session
			return { session: null, user: null };
		}

		// Fetch profile data (role, company_name, is_verified)
		const { data: profile } = await event.locals.supabase
			.from('profiles')
			.select('role, company_name, is_verified')
			.eq('id', user.id)
			.single();

		return {
			session,
			user: {
				...user,
				role: profile?.role as 'admin' | 'company' | undefined,
				company_name: profile?.company_name as string | undefined,
				is_verified: profile?.is_verified as boolean | undefined
			}
		};
	};

	const { session, user } = await event.locals.safeGetSession();
	event.locals.session = session;
	event.locals.user = user;

	// Simple Protect Route Logic
	if (event.url.pathname.startsWith('/admin') && user?.role !== 'admin') {
		redirect(303, '/login');
	}

	if (event.url.pathname.startsWith('/dashboard') && !user) {
		redirect(303, '/login');
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-parse';
		}
	});
};

export const handle = sequence(auth);
