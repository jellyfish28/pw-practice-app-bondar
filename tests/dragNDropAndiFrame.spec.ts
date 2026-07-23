import { expect } from '@playwright/test';
import { test } from '../test-options'

test.beforeEach(async ({ page, globalQaURL }) => {
    await page.goto(globalQaURL);
});

test('drag n drop in iFrame', async ({ page }) => {
    //identify iFrame
    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe');
    //drag n drop to destination
    await frame.locator('li', { hasText: 'High Tatras 2' }).dragTo(frame.locator('#trash'));

    //drag with mouse
    await frame.locator('li', { hasText: 'High Tatras 4' }).hover()
    page.mouse.down()//press left bttn of mouse
    await frame.locator('#trash').hover()//go to element area
    page.mouse.up()//release bttn

    await expect(frame.locator('#trash li h5')).toHaveText(['High Tatras 2', 'High Tatras 4']);
})