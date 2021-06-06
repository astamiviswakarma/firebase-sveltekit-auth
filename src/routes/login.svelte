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

<button on:click={signIn}>Login with Google</button>