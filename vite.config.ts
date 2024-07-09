import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			pwaAssets: {
				config: true
			},
			manifest: {
				short_name: 'rataiada',
				name: 'Rataiada',
				start_url: process.argv.includes('dev') ? '/' : process.env.BASE_PATH,
				scope: process.argv.includes('dev') ? '/' : process.env.BASE_PATH,
				display: 'standalone',
				theme_color: '#ffffff',
				background_color: '#ffffff'
			}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
