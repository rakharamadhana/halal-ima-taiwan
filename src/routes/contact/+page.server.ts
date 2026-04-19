import { fail } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !subject || !message) {
      return fail(400, { error: 'All fields are required' });
    }

    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .insert([{ name, email, subject, message }]);

      if (error) {
        console.error('Supabase error:', error);
        return fail(500, { error: 'Failed to send message. Please try again later.' });
      }

      return { success: true };
    } catch (err) {
      console.error('Action error:', err);
      return fail(500, { error: 'An unexpected error occurred.' });
    }
  }
};
