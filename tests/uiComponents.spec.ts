import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:51003/');
});

test.describe('UI Components', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });

    test('Using grid form', async ({ page }) => {
        const formEmail = await page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' });

        await formEmail.fill('test@example.com');
        await formEmail.clear();

        await formEmail.pressSequentially('test2@example.com', { delay: 500 });

        const inputText = await formEmail.inputValue();
        //generic assertion
        expect(inputText).toEqual('test2@example.com');

        //locator assertion
        expect(formEmail).toHaveValue('test2@example.com');
    })
})