<script>
	import { supabaseClient } from '$lib/db'
	import { goto } from '$app/navigation'
	export let data
	export let user

	async function signout() {
		try {
			const { error } = await supabaseClient.auth.signOut()
			goto('/')
			if (error) throw error
		} catch (error) {
			console.log(error.message)
		} finally {
		}
	}
</script>

<div class="block">
	<p>Protected content for {user.email}</p>
	<p>server-side fetched data with RLS:</p>
	<pre>{JSON.stringify(data, null, 2)}</pre>
</div>
<div class="block">
	<p>user:</p>
	<pre>{JSON.stringify(user, null, 2)}</pre>
</div>
<button on:click={signout}>SignOut</button>
