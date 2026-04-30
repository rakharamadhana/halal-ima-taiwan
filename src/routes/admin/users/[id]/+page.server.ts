import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const { data: profile, error: pError } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', params.id)
		.single();

	if (pError || !profile) {
		throw error(404, 'User not found');
	}

	return { profile };
};
