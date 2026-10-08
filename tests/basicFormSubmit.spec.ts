import { test, expect } from '@playwright/test';

test('Basic form submit', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();

    const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' });
    const emailInput = basicForm.getByRole('textbox', { name: 'Email' });
    const passwordInput = basicForm.getByRole('textbox', { name: 'Password' });
    const submitButton = basicForm.getByRole('button', { name: 'Submit' });

    await emailInput.fill(process.env.USER_EMAIL!);
    await passwordInput.fill(process.env.USER_PASSWORD!);
    await basicForm.locator('nb-checkbox').click();
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    await expect(emailInput).toHaveValue(process.env.USER_EMAIL!);
});

test('Form without labels', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();

    const basicForm = page.locator('nb-card').filter({ hasText: 'Form without labels' });
    const emailInput = basicForm.getByRole('textbox', { name: 'Recipients' });
    const passwordInput = basicForm.getByRole('textbox', { name: 'Subject' });
    const messageInput = basicForm.getByPlaceholder('Message');
    const submitButton = basicForm.getByRole('button', { name: 'Send' });

    await emailInput.fill(process.env.USERNAME!);
    await expect(emailInput).toHaveValue(process.env.USERNAME!);
    await passwordInput.fill(process.env.PASSWORD!);
    await messageInput.fill('Test message');
    await expect(submitButton).toBeEnabled();
    await submitButton.click();
})

test('Horizontal form submission', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();

    const horizontalForm = page.locator('nb-card').filter({ hasText: 'Horizontal form' });
    const emailInput = horizontalForm.getByLabel('Email');
    const passwordInput = horizontalForm.getByLabel('Password');
    const rememberMeCheckbox = horizontalForm.locator('nb-checkbox');
    const signInButton = horizontalForm.getByRole('button', { name: 'Sign in' });

    await emailInput.fill(process.env.USERNAME!);
    await passwordInput.fill(process.env.PASSWORD!);
    await rememberMeCheckbox.click();

    await expect(emailInput).toHaveValue(process.env.USERNAME!);
    await expect(passwordInput).toHaveValue(process.env.PASSWORD!);
    await expect(rememberMeCheckbox).toContainText('Remember me');
    await expect(signInButton).toBeEnabled();
    await signInButton.click();
});
