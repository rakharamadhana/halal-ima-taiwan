import type { PageServerLoad, Actions } from './$types';
import { error, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const { data: request, error: rError } = await supabase
		.from('certification_requests')
		.select('*')
		.eq('id', params.id)
		.single();

	if (rError || !request) {
		throw error(404, 'Certification request not found');
	}

	return { request };
};

export const actions: Actions = {
	updateStatus: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const status = formData.get('status') as string;
		const adminNotes = formData.get('adminNotes') as string;

		const { error: updateError } = await supabase
			.from('certification_requests')
			.update({ status, admin_notes: adminNotes, updated_at: new Date().toISOString() })
			.eq('id', id);

		if (updateError) {
			return fail(500, { error: updateError.message });
		}

		return { success: true };
	}
};
