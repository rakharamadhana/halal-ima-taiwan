import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: profiles } = await supabase
		.from('profiles')
		.select('*')
		.order('created_at', { ascending: false });

	const { count: unverifiedCount } = await supabase
		.from('profiles')
		.select('*', { count: 'exact', head: true })
		.eq('is_verified', false);

	return {
		profiles: profiles || [],
		unverifiedCount: unverifiedCount || 0
	};
};
