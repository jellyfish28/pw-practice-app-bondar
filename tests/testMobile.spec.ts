import { test, expect } from '@playwright/test';


test('Using grid form', async ({ page }, testInfo) => {
    await page.goto('/');

    //check if the test is running in mobile project, if yes, click on the sidebar toggle button to open the sidebar menu
    if (testInfo.project.name === 'mobile') {
        await page.locator('.sidebar-toggle').click();
    }

    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();

    if (testInfo.project.name === 'mobile') {
        await page.locator('.sidebar-toggle').click();
    }
    const formEmail = await page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' });

    await formEmail.fill('test@example.com');
    await formEmail.clear();

    await formEmail.pressSequentially('test2@example.com', { delay: 500 });

    const inputText = await formEmail.inputValue();
    //generic assertion
    expect(inputText).toEqual('test2@example.com');

    expect(formEmail).toHaveValue('test2@example.com');
})