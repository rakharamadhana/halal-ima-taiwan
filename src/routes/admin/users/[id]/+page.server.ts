import type { PageServerLoad, Actions } from './$types';
import { error, fail } from '@sveltejs/kit';

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

export const actions: Actions = {
	toggleVerification: async ({ request, params, locals: { supabase } }) => {
		const formData = await request.formData();
		const isVerified = formData.get('isVerified') === 'true';

		const { error: updateError } = await supabase
			.from('profiles')
			.update({ is_verified: isVerified })
			.eq('id', params.id);

		if (updateError) {
			return fail(500, { 
				error: 'Failed to update verification status',
				isVerified 
			});
		}

		return { success: true, isVerified };
	},

	updateProfile: async ({ request, params, locals: { supabase } }) => {
		const formData = await request.formData();
		const companyName = formData.get('companyName') as string;
		const email = formData.get('email') as string;
		const role = formData.get('role') as string;

		const { error: updateError } = await supabase
			.from('profiles')
			.update({ 
				company_name: companyName || null,
				email: email || null,
				role: role as 'admin' | 'company'
			})
			.eq('id', params.id);

		if (updateError) {
			return fail(500, { 
				error: 'Failed to update profile',
				companyName,
				email,
				role
			});
		}

		return { success: true };
	}
};
