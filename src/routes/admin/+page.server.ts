import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import * as XLSX from 'xlsx';

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

	const { data: certificationRequests, error: crError } = await supabase
		.from('certification_requests')
		.select('*')
		.in('status', ['submitted', 'under_review'])
		.order('created_at', { ascending: false });

	if (crError) {
		console.error('Error fetching certification requests:', crError);
	}

	return {
		profiles: profiles || [],
		unverifiedCount: unverifiedCount || 0,
		certificationRequests: certificationRequests || []
	};
};

export const actions: Actions = {
	downloadReport: async ({ locals: { supabase } }) => {
		try {
			// Fetch all data for the report
			const { data: profiles, error: pError } = await supabase
				.from('profiles')
				.select('*')
				.order('created_at', { ascending: false });

			const { data: certificationRequests, error: crError } = await supabase
				.from('certification_requests')
				.select('*')
				.order('created_at', { ascending: false });

			if (pError || crError) {
				return fail(500, { error: 'Failed to fetch data for report' });
			}

			// Create Excel workbook
			const wb = XLSX.utils.book_new();

			// Profiles worksheet
			const profilesData = profiles?.map(profile => ({
				'User ID': profile.id,
				'Company Name': profile.company_name || 'Personal Account',
				'Email': profile.email || 'No email',
				'Role': profile.role,
				'Verification Status': profile.is_verified ? 'Verified' : 'Not Verified',
				'Registration Date': new Date(profile.created_at).toLocaleDateString('id-ID'),
				'Last Updated': profile.updated_at ? new Date(profile.updated_at).toLocaleDateString('id-ID') : 'Never'
			})) || [];

			const profilesWs = XLSX.utils.json_to_sheet(profilesData);
			XLSX.utils.book_append_sheet(wb, profilesWs, 'Users & Companies');

			// Certification Requests worksheet
			const certData = certificationRequests?.map(request => ({
				'Request ID': request.id,
				'Company Name': request.company_name,
				'Contact Email': request.contact_email,
				'Requested Scope': request.requested_scope,
				'Status': request.status,
				'Submission Date': new Date(request.created_at).toLocaleDateString('id-ID')
			})) || [];

			const certWs = XLSX.utils.json_to_sheet(certData);
			XLSX.utils.book_append_sheet(wb, certWs, 'Certification Requests');

			// Generate Excel file as base64 for client-side download
			const excelBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
			const base64 = Buffer.from(excelBuffer).toString('base64');
			const filename = `halal-ima-report-${new Date().toISOString().split('T')[0]}.xlsx`;

			return { 
				success: true, 
				fileData: base64, 
				filename 
			};

		} catch (error) {
			console.error('Error generating report:', error);
			return fail(500, { error: 'Failed to generate report' });
		}
	}
};
