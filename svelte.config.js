import preprocess from 'svelte-preprocess';
import ssr from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
		  defaults: {
			style: 'postcss'
		  },
		  postcss: true
		})
	],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: ssr(),
		target: '#svelte'
	}
};

export default config;
