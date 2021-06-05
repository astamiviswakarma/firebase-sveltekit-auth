import type { Request, Response } from '@sveltejs/kit';
import * as cookie from 'cookie';
import { authAdmin } from '$lib/firebaseAdmin';

export async function post(request: Request): Promise<Response> {
	const body = request.body;

	// Get the ID token passed and the CSRF token.
	const idToken = body['idToken'];

	// Set session expiration to 5 days.
	const expiresIn = 60 * 24 * 5 * 1000;

	try {
		const sessionCookie = await new Promise<string>((resolve, reject) =>
			authAdmin.createSessionCookie(idToken, { expiresIn }).then(resolve, reject)
		);

		return {
			headers: {
				'set-cookie': cookie.serialize('session', sessionCookie, {
					maxAge: expiresIn,
					httpOnly: true,
					path: '/'
				})
			},
			body: JSON.stringify({ status: 'success' }),
            status: 200
		};
	} catch (e) {
		console.error(e);
		return {
			status: 401,
            headers: {},
			body: 'Unauthorized'
		};
	}
}

export async function del(): Promise<Response> {
	return {
        status: 200,
		headers: {
			'set-cookie': cookie.serialize('session', '__deleted__', {
				maxAge: 0,
				httpOnly: true,
				path: '/'
			})
		},
		body: JSON.stringify({ status: 'Logged Out' })
	};
}
