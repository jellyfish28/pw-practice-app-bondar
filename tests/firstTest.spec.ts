import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});//will be executed before each test in the file, it will navigate to the specified URL before each test runs

test.describe('Test suite1 @block', () => {

    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
    });//will be executed before each test in the describe block, it will click on the 'Charts' text before each test runs

    test('basic test', async ({ page }) => {
        await page.getByText('Form Layouts').click();
    });

    test('basic Datepicker', async ({ page }) => {
        await page.getByText('Datepicker').click();
    });
})

test.describe('Test suite2', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
    });//will be executed before each test in the describe block, it will click on the 'Forms' text before each test runs

    test('basic test', async ({ page }) => {
        await page.getByText('Form Layouts').click();
    });

    test('basic Datepicker', async ({ page }) => {
        await page.getByText('Datepicker').click();
    });
})


