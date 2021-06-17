<script lang="ts">
  import { auth } from '$lib/firebase';
  import { session } from '$app/stores';
  import { initClient } from '@urql/svelte';
  import * as mdc from 'material-components-web';
  import { onMount } from 'svelte';

  onMount(() => {
    mdc.autoInit();
  });

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

  const hasura = initClient({
    url: 'https://dev-arogyashram.herokuapp.com/v1/graphql',
    fetchOptions: () => {
      if ($session && $session.user) {
        const token = $session.token;
        return {
          headers: { Authorization: token ? `Bearer ${token}` : '' },
        };
      }
      return {
        headers: {},
      };
    },
  });
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
  @import 'material-components-web/dist/material-components-web';
  @import 'material-icons/iconfont/material-icons.css';
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>