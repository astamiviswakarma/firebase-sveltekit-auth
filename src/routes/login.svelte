<script lang="ts">
    import { auth, googleProvider } from '$lib/firebase';
    import { goto } from '$app/navigation';
    import { session } from '$app/stores';
    
    
    async function signIn() {
        const credential = await auth.signInWithPopup(googleProvider);
        const idToken = await credential.user.getIdToken();
        await fetch('/auth/session', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idToken })
        });
        session.set({ user: { uid: credential.user.uid }, token: idToken });
        goto('/dashboard', {replaceState: true});
    }
</script>


<button class="mdc-icon-button" on:click={signIn}
   aria-label="Add to favorites"
   aria-pressed="false"
   data-mdc-auto-init="MDCIconButtonToggle">
  <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">login</i>
  <i class="material-icons mdc-icon-button__icon">login_border</i>
</button>

<br/>
<br/>

<button class="mdc-button mdc-button--raised" on:click={signIn}>  <span class="mdc-button__ripple"></span> Learn More</button>


<button on:click={signIn}>Login with Google</button>