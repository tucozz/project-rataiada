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
				description: "A Mausritter's RPG character sheet right in your browser.",
				start_url: process.argv.includes('dev') ? '/' : process.env.BASE_PATH,
				scope: process.argv.includes('dev') ? '/' : process.env.BASE_PATH,
				display: 'standalone',
				theme_color: '#ffffff',
				background_color: '#ffffff',
				screenshots: [
					{
						src: 'screenshots/screenshot-mobile.png',
						sizes: '369x653',
						type: 'image/png',
						form_factor: 'narrow',
						label: 'Root page'
					}
				]
			}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
