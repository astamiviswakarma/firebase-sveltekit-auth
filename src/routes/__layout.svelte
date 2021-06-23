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

<header class="mdc-top-app-bar">
  <div class="mdc-top-app-bar__row">
    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
      <button class="mdc-icon-button material-icons mdc-top-app-bar__navigation-icon--unbounded">menu</button>
      <span class="mdc-top-app-bar__title">San Francisco, CA</span>
    </section>
    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
      <button class="mdc-icon-button material-icons mdc-top-app-bar__action-item--unbounded" aria-label="Download">file_download</button>
      <!-- <button class="mdc-icon-button material-icons mdc-top-app-bar__action-item--unbounded" aria-label="Print this page">print</button> -->
      <!-- <button class="mdc-icon-button material-icons mdc-top-app-bar__action-item--unbounded" aria-label="Bookmark this page">bookmark</button> -->
    </section>
  </div>
</header>
<main class="mdc-top-app-bar--fixed-adjust">
<nav>
  <a href="/">Home</a> |
  {#if $session && !$session.user}
  <a href="/login">Login</a>
  {:else}
  <a href="/dashboard">Dashboard</a> |
  <button on:click={() => signOut()}>Logout</button>
  {/if}
</nav>
  <slot />
</main>

<style global lang="postcss">
  @import 'material-components-web/dist/material-components-web';
  @import 'material-icons/iconfont/material-icons.css';
  @import '@fontsource/poppins';

  html {
    font-family: "Poppins";
    --mdc-typography-font-family: "Poppins";
    --mdc-theme-primary: brown;
  }

  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>