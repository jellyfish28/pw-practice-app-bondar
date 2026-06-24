import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:51003/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
});//will be executed before each test in the file, it will navigate to the specified URL before each test runs

test('find locators', async ({ page }) => {
    //by tag name
    await page.locator('input').first().click();
    //by ID
    await page.locator('#inputEmail1').click();
    //by class
    await page.locator('.shape-rectangle');
    //by attribute name
    await page.locator('[placeholder="Email"]');
    //by full class
    await page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]');
    //by combination of attributes
    await page.locator('input[placeholder="Email"]');
    //by Xpath
    await page.locator('//*[@placeholder="Email"]');
    //by partial text match
    await page.locator(':text("Using")');
    //by exect text match
    await page.locator(':text-is("Using the Grid")');
});

test('user facing locators ', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).first().click();
    await page.getByRole('button', { name: 'Sign in' }).first().click();

    await page.getByLabel('Email').first().click();
    await page.getByPlaceholder('Jane Doe').click();
    await page.getByText('Using the Grid').click();
    await page.getByTestId('SignIn').click();
    await page.getByTitle('IoT Dashboard').click();
});

test('locating child elements', async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();

    await page.locator('nb-card').getByRole('button', { name: 'Sign in' }).first().click;
    await page.locator('nb-card').nth(3).getByRole('button').click();
});

test('locating parent elements', async ({ page }) => {
    await page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' }).click();
    await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('textbox', { name: 'Email' }).click();
    await page.locator('nb-card').filter({ hasText: 'Basic form' }).getByRole('textbox', { name: 'Email' }).click();
    await page.locator('nb-card').filter({ has: page.locator('.status-danger') }).getByRole('textbox', { name: 'Password' }).click();
    await page.locator('nb-card').filter({ has: page.locator('[type="checkbox"]') }).filter({ hasText: 'Sign in' }).getByRole('textbox', { name: 'Email' }).click();
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', { name: 'Email' }).click();
});

test('reuse elements', async ({ page }) => {
    const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' });
    const email = basicForm.getByRole('textbox', { name: 'Email' });

    await email.fill('test@example.com');
    await basicForm.getByRole('textbox', { name: 'Password' }).fill('password');
    await basicForm.locator('nb-checkbox').click();
    await basicForm.getByRole('button', { name: 'Submit' }).click();

    await expect(email).toHaveValue('test@example.com');
});

test('take value from element', async ({ page }) => {
    //single value
    const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' });
    const buttonText = await basicForm.getByRole('button').textContent();

    expect(buttonText).toEqual('Submit');

    //all values
    const allRadioButtons = await page.locator('nb-card').filter({ hasText: 'Using the Grid' }).locator('nb-radio').allTextContents();
    expect(allRadioButtons).toContain('Option 1');

    //input value
    const emailInput = basicForm.getByRole('textbox', { name: 'Email' });
    await emailInput.fill('test@example.com');
    const emailValue = await emailInput.inputValue();
    expect(emailValue).toEqual('test@example.com');

    //get attribute
    const emailInputId = await emailInput.getAttribute('placeholder');
    expect(emailInputId).toEqual('Email');
});
test('assertions', async ({ page }) => {
    const basicFormButton = page.locator('nb-card').filter({ hasText: 'Basic form' }).locator('button');

    //general assertions - do nit wait for the assertion to pass, it will fail if the assertion is not met immediately
    const buttonText = await basicFormButton.textContent();
    expect(buttonText).toEqual('Submit');

    //Locator assertion - wait upt o 5 seconds for the assertion to pass
    await expect(basicFormButton).toHaveText('Submit');

    //soft assertion - will not fail the test if the assertion is not met, it will log a warning instead
    await expect.soft(basicFormButton).toHaveText('Submit 5');
    await basicFormButton.click();

}); 