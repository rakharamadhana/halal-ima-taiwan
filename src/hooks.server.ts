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

	if (event.url.pathname === '/reset-password' && event.url.searchParams.has('code')) {
		const code = event.url.searchParams.get('code');

		if (code) {
			const { error } = await event.locals.supabase.auth.exchangeCodeForSession(code);

			if (error) {
				redirect(303, '/reset-password?expired=true');
			}

			redirect(303, '/reset-password');
		}
	}

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
		let { data: profile, error: profileError } = await event.locals.supabase
			.from('profiles')
			.select('*')
			.eq('id', user.id)
			.single();

		if (profileError) {
			console.dir(profileError, { depth: null });

			// Try fallback by email just to see if the ID is the problem
			console.log(`--- DEBUG: TRYING FALLBACK FETCH BY EMAIL: ${user.email} ---`);
			const { data: fallbackProfile, error: fallbackError } = await event.locals.supabase
				.from('profiles')
				.select('*')
				.eq('email', user.email)
				.maybeSingle();

			if (fallbackProfile) {
				console.log('--- DEBUG: FOUND PROFILE BY EMAIL BUT NOT BY ID! ---');
				profile = fallbackProfile;
			} else if (fallbackError) {
				console.error('--- HOOKS: FALLBACK ERROR ---', fallbackError);
			}
		}

		// Robust role detection: check Profile table, then App Metadata, then User Metadata
		let rawRole = (profile?.role ||
			user.app_metadata?.role ||
			user.user_metadata?.role ||
			'company') as string;

		const role = rawRole.toLowerCase() === 'admin' ? 'admin' : 'company';
		const company_name =
			profile?.company_name ||
			user.user_metadata?.company_name ||
			(role === 'admin' ? 'Halal IMA Admin' : '');

		// Use the column directly from Supabase profiles table
		const is_verified = profile?.is_verified ?? false;

		return {
			session,
			user: {
				...user,
				...profile, // Include all fields from the profiles table (pic_name, phone, address, etc.)
				role,
				company_name,
				is_verified
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

	if (event.url.pathname.startsWith('/dashboard') && user?.role === 'admin') {
		redirect(303, '/admin');
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-parse';
		}
	});
};

export const handle = sequence(auth);
