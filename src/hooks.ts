import * as cookie from 'cookie';
import { authAdmin } from '$lib/firebaseAdmin';
import { auth } from '$lib/firebase';

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession(request) {
	const cookies = cookie.parse(request.headers.cookie || '');

	const sessionCookie = cookies.session || '';

	try {
		const decodedClaims = await authAdmin.verifySessionCookie(sessionCookie, true);
		const adminToken = await authAdmin.createCustomToken(decodedClaims.uid);
		const credentials = await auth.signInWithCustomToken(adminToken);

		return { user: decodedClaims, token: await credentials.user.getIdToken() };
	} catch (e) {
		return { user: null };
	}
}