import { test, expect } from '@playwright/test';

test('Test offline and trailing slashes', async ({ browser }) => {
	// test offline + trailing slashes routes
	const context = await browser.newContext();
	const offlinePage = await context.newPage();
	await offlinePage.goto('/');
	const offlineSwURL = await offlinePage.evaluate(async () => {
		const registration = await Promise.race([
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			navigator.serviceWorker.ready,
			new Promise((_, reject) =>
				setTimeout(() => reject(new Error('Service worker registration failed: time out')), 10000)
			)
		]);
		// @ts-expect-error registration is of type unknown
		return registration.active?.scriptURL;
	});
	const offlineSwName = 'sw.js';
	expect(offlineSwURL).toBe(`http://localhost:4173/${offlineSwName}`);
	await context.setOffline(true);
	const url = await offlinePage.evaluate(async () => {
		await new Promise((resolve) => setTimeout(resolve, 3000));
		return location.href;
	});
	expect(url).toBe('http://localhost:4173/');
	await offlinePage.reload({ waitUntil: 'load' });
	expect(offlinePage.url()).toBe('http://localhost:4173/');
	// Dispose context once it's no longer needed.
	await context.close();
});
