import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, user } }) => {
	// Fetch company's own certificates
	const { data: myCertificates } = await supabase
		.from('certificates')
		.select('*')
		.eq('company_name', user?.company_name)
		.order('expiry_date', { ascending: false });

	return {
		myCertificates: myCertificates || []
	};
};
