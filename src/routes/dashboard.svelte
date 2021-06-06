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

<script lang=ts>
	import { operationStore, query } from '@urql/svelte';
	import { onMount } from 'svelte';

	const todo = operationStore(
	`
	query {
		clinics {
			id
			is_active
			last_modified
			latitude
			longitude
			name
		}
	}`);

	query(todo);

	onMount(async () => {
		$todo.context = { requestPolicy: 'cache-and-network' }; // can set it network-only for no cache.
	});

</script>

<h1>Welcome to SvelteKit Dashboard</h1>
<p>Visit <a class="font-bold !font-medium" href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>


{#if $todo.fetching}
<p>Loading...</p>
{:else if $todo.error}
<p>Oh no... {$todo.error.message}</p>
{:else if $todo.data !== undefined}
<ul>
	{#each $todo.data.clinics as cat}
	<li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">
		{cat.name}
	</a></li>
	{/each}
</ul>
{/if}
