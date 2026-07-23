import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { faker } from '@faker-js/faker'


test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('Navigation @smoke @regression', async ({ page }) => {
    const pageManager = new PageManager(page);
    await pageManager.navigateTo().navigateToFormsPage();
    await pageManager.navigateTo().navigateToDatepickerPage();
    await pageManager.navigateTo().navigateToSmartTablePage();
    await pageManager.navigateTo().navigateToToastrPage();
    await pageManager.navigateTo().navigateToTooltipPage();
})

test('Submit Using grid form', async ({ page }) => {
    const pageManager = new PageManager(page);
    await pageManager.navigateTo().navigateToFormsPage();
    await pageManager.onFormLayoutPage().submitUsingGridForm(process.env.USERNAME || 'test@gmail.com', process.env.PASSWORD || '12345', 'Option 2');
})

test('Submit Inline form', async ({ page }) => {
    const pageManager = new PageManager(page);
    const firstName = faker.person.firstName();
    const email = `${firstName}${faker.number.int({ max: 100 })}@test.ua`;

    await pageManager.navigateTo().navigateToFormsPage();
    //screenshot for specific locator
    await page.locator('nb-card', { hasText: 'Inline form' }).screenshot({ path: 'screenshots/inlineFormScreen.png' })
    await page.screenshot({ path: 'screenshots/inlineForm.png' })
    await pageManager.onFormLayoutPage().submitInlineForm(firstName, email, false);

})

test('Datepicker selection', async ({ page }) => {
    const pageManager = new PageManager(page);

    await pageManager.navigateTo().navigateToDatepickerPage();
    await pageManager.onDatePickerPage().selectDateFromCommonDatepickerFromToday(5);
    await pageManager.onDatePickerPage().selectDateFromRangeCalender(5, 7);
})