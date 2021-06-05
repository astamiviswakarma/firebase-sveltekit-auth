import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import { browser } from '$app/env';
import credentials from './config/firebase-appsdk.json';

if (!firebase.apps.length) {
	firebase.initializeApp(credentials);
}

export const analytics = (): firebase.analytics.Analytics => firebase.analytics();
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

if (browser) {
	// Auth is handled using session cookies, and the server will always re-send
	// a token for any authenticated session
	auth.setPersistence(firebase.auth.Auth.Persistence.NONE);
}
