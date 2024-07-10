//import { expect, test } from '@playwright/test';
/* 
test('layout has expected bottom nav to be visible', async ({ page }) => {
	await page.goto('/characters/1');
	await expect(page.locator('#bottom-nav')).toBeInViewport();
});

test('layout after window scroll y positive expected bottom nav to be not visible', async ({
	page
}) => {
	await page.goto('/characters/1');
	await page.getByRole('document').screenshot({ animations: 'disabled' }); // required just to disable animations
	const bottomNav = page.locator('#bottom-nav');

	await page.mouse.wheel(0, 10);

	await expect(bottomNav).not.toBeInViewport();
});

test('layout after window scroll y positive then scroll y negative expected bottom nav be visible', async ({
	page
}) => {
	await page.goto('/characters/1');

	await page.mouse.wheel(0, 10);
	await page.mouse.wheel(0, -5);

	await expect(page.locator('#bottom-nav')).toBeInViewport();
});
 */
