import { SupabaseClient, Session, User } from '@supabase/supabase-js';

type ExtendedUser =
	| (User & { role?: 'admin' | 'company'; company_name?: string; is_verified?: boolean })
	| null;

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
			safeGetSession: () => Promise<{ session: Session | null; user: ExtendedUser }>;
			session: Session | null;
			user: ExtendedUser;
		}
		interface PageData {
			session: Session | null;
			user: ExtendedUser;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
