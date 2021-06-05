<script lang="ts">
    import { auth } from '$lib/firebase';
    import { session } from '$app/stores';

    async function signOut() {
		await auth.signOut();
		await fetch('/auth/session', {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({})
		});
		session.set({ user: null });
	}
</script>
<nav>
    <a href="/">Home</a> |
    {#if $session && !$session.user}
    <a href="/login">Login</a>
    {:else}
    <a href="/dashboard">Dashboard</a> |
    <button on:click={() => signOut()}>Logout</button>
    {/if}
  </nav>
<main>
    <slot />
</main>
<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>