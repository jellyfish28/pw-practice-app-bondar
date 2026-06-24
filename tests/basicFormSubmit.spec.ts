import { test, expect } from '@playwright/test';

test('Basic form submit', async ({ page }) => {
    await page.goto('http://localhost:51003/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();

    const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' });
    const emailInput = basicForm.getByRole('textbox', { name: 'Email' });
    const passwordInput = basicForm.getByRole('textbox', { name: 'Password' });
    const submitButton = basicForm.getByRole('button', { name: 'Submit' });

    await emailInput.fill('test@example.com');
    await passwordInput.fill('password123');
    await basicForm.locator('nb-checkbox').click();
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    await expect(emailInput).toHaveValue('test@example.com');
});
