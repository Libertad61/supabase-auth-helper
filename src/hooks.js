import { handleAuth } from '@supabase/auth-helpers-sveltekit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(
	...handleAuth({
		cookieOptions: { lifetime: 1 * 365 * 24 * 60 * 60 }
	})
);

export const getSession = async (event) => {
	const { user, accessToken } = event.locals;
	return {
		user,
		accessToken
	};
};
