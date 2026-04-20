import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: profiles, error: pError } = await supabase
		.from('profiles')
		.select('*')
		.order('created_at', { ascending: false });

	if (pError) {
		console.error('Error fetching profiles:', pError);
	}

	const { count: unverifiedCount, error: cError } = await supabase
		.from('profiles')
		.select('*', { count: 'exact', head: true })
		.eq('is_verified', false);

	if (cError) {
		console.error('Error counting unverified:', cError);
	}

	return {
		profiles: profiles || [],
		unverifiedCount: unverifiedCount || 0
	};
};
