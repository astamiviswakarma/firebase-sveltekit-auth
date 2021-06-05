<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ session }) {
		if (!session.user) {
			return {
				status: 303,
				redirect: '/login'
			};
		}
		return {};
	}
</script>
<h1>Welcome to SvelteKit Dashboard</h1>
<p>Visit <a class="font-bold !font-medium" href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
