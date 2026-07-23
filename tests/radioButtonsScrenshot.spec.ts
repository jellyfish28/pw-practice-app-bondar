import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
});

test('radio buttons', async ({ page }) => {
    const form = await page.locator('nb-card', { hasText: 'Using the Grid' });
    await form.getByRole('radio', { name: 'Option 1' }).check({ force: true });
    const isChecked = await form.getByRole('radio', { name: 'Option 1' }).isChecked();
    await expect(form).toHaveScreenshot({ maxDiffPixels: 100 });
})