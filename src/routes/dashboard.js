import { supabaseServerClient, withApiAuth } from '@supabase/auth-helpers-sveltekit'
export const GET = async ({ locals, request }) =>
	withApiAuth(
		{
			redirectTo: '/',
			user: locals.user
		},
		async () => {
			const { data } = supabaseServerClient(request).from('test').select('*')
			return {
				body: {
					data: 'test data',
					user: locals.user
				}
			}
		}
	)
