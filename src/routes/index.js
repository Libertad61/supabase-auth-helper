import { supabaseClient } from '$lib/db'
console.log(supabaseClient)
export const GET = async ({ locals }) => {
	if (locals.user) {
		return {
			status: 303,
			headers: {
				location: '/dashboard'
			}
		}
	}
	return {
		status: 200
	}
}

export const POST = async ({ request, url }) => {
	const data = await request.formData()

	const email = data.get('email')
	const password = data.get('password')

	const headers = { location: '/dashboard' }
	const errors = {}
	const values = { email, password }

	const { session, error } = await supabaseClient.auth.signIn({ email, password })

	if (error) {
		errors.form = error.message
		return {
			status: 400,
			body: {
				errors,
				values
			}
		}
	}

	if (session) {
		const response = await fetch(`${url.origin}/api/auth/callback`, {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			credentials: 'same-origin',
			body: JSON.stringify({ event: 'SIGNED_IN', session })
		})

		// TODO: Add helper inside of auth-helpers-sveltekit library to manage this better
		const cookies = response.headers
			.get('set-cookie')
			.split('SameSite=Lax, ')
			.map((cookie) => {
				if (!cookie.includes('SameSite=Lax')) {
					cookie += 'SameSite=Lax'
				}
				return cookie
			})
		headers['Set-Cookie'] = cookies
	}
	return {
		status: 303,
		headers
	}
}
