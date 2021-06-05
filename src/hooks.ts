import * as cookie from 'cookie';
import { auth } from '$lib/firebaseAdmin';
import type * as admin from 'firebase-admin';
import type { Context } from '$lib/types/context';

export async function getContext({ headers }): Promise<Context> {
	const cookies = cookie.parse(headers.cookie || '');

	const sessionCookie = cookies.session || '';

	try {
		const decodedClaims = await new Promise<admin.auth.DecodedIdToken>((resolve, reject) => auth.verifySessionCookie(sessionCookie, true).then(resolve).catch(reject));
		return { user: decodedClaims };
	} catch (e) {
		return { user: null };
	}
}

type Session = {
	user: { uid: string } | null;
};

export function getSession({ context }: { context: Context }): Session {
	return {
		user:
		context.user == null
		? null
		: {
			uid: context.user.uid
		}
	};
}
