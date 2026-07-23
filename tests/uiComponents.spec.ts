import { test, expect } from '@playwright/test';

//test.describe.configure({ mode: 'parallel' })

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('UI Components', () => {
    //retries
    test.describe.configure({ retries: 2 })
    test.describe.configure({ mode: 'serial' })

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

    test('radio buttons', async ({ page }) => {
        const form = await page.locator('nb-card', { hasText: 'Using the Grid' });

        //await form.getByLabel('Option 1').check({ force: true });
        await form.getByRole('radio', { name: 'Option 1' }).check({ force: true });
        const isChecked = await form.getByRole('radio', { name: 'Option 1' }).isChecked();
        expect(isChecked).toBeTruthy();

        await expect(form.getByRole('radio', { name: 'Option 1' })).toBeChecked();

        await form.getByRole('radio', { name: 'Option 2' }).check({ force: true });
        await expect(form.getByRole('radio', { name: 'Option 1' })).not.toBeChecked();
        await expect(form.getByRole('radio', { name: 'Option 2' })).toBeChecked();
    })
})

test('checkboxes', async ({ page }) => {

    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();

    await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true });
    expect(await page.getByRole('checkbox', { name: 'Hide on click' }).isChecked()).toBeFalsy();

    await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true });
    expect(await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).isChecked()).toBeTruthy();

    //all() - returns an array of locators, so we can iterate over them
    const checkboxes = await page.getByRole('checkbox');
    for (const checkbox of await checkboxes.all()) {
        await checkbox.check({ force: true });
        expect(await checkbox.isChecked()).toBeTruthy();
    }
})

test('dropdowns and lists', async ({ page }) => {
    const list = page.locator('ngx-header nb-select');
    list.click();

    //getByRole('list') - returns a locator for the UL elements only
    //getByRole('listitem') - returns a locator for the LI elements only
    const listItems = await page.getByRole('list').locator('nb-option');
    await expect(listItems).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])

    await listItems.filter({ hasText: 'Dark' }).click();
    const layout = page.locator('nb-layout-header');
    await expect(layout).toHaveCSS('background-color', 'rgb(34, 43, 69)');

    const colors = {
        'Light': 'rgb(255, 255, 255)',
        'Dark': 'rgb(34, 43, 69)',
        'Cosmic': 'rgb(50, 50, 89)',
        'Corporate': 'rgb(255, 255, 255)'
    }

    list.click();
    for (const color in colors) {
        await listItems.filter({ hasText: color }).click();
        await expect(layout).toHaveCSS('background-color', colors[color as keyof typeof colors]);
        if (color !== 'Corporate') {
            list.click();
        }

    }
})

test('tooltips', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Tooltip').click();

    const tooltipButton = page.locator('nb-card', { hasText: 'Tooltip Placements' });
    await tooltipButton.getByRole('button', { name: 'Top' }).hover();

    const tooltip = await page.locator('nb-tooltip').textContent();
    await expect(tooltip).toEqual('This is a tooltip');
})

test('dialog boxes', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart table').click();

    page.on('dialog', async dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?');
        await dialog.accept();
    });

    await page.getByRole('table').locator('tr', { hasText: 'mdo@gmail.com' }).locator('.nb-trash').click();
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com');
})

test('tables', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart table').click();


    // 1. by row locator
    // const row = await page.getByRole('row', { name: 'twitter@outlook.com' });
    // await row.locator('.nb-edit').click();
    // await row.locator('input-editor').getByPlaceholder('Age').clear();
    // await row.locator('input-editor').getByPlaceholder('Age').fill('35');
    // await row.locator('.nb-checkmark').click();

    // 2 - by column
    // await page.locator('.ng2-smart-pagination-nav').getByText('2').click();
    // const row2 = await page.getByRole('row', { name: '11' }).filter({ has: page.locator('td').nth(1).getByText('11') });
    // await row2.locator('.nb-edit').click();
    // await page.locator('input-editor').getByPlaceholder('E-mail').clear();
    // await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@example.com');
    // await page.locator('.nb-checkmark').click();
    // await expect(row2.locator('td').nth(5)).toHaveText('test@example.com');

    //filter by Age
    const ages = ['20', `30`, `40`, `200`];
    for (let age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear();
        await page.locator('input-filter').getByPlaceholder('Age').fill(age);

        await page.waitForTimeout(500); // wait for the table to update
        const rows = await page.locator('tbody tr');
        for (const row of await rows.all()) {
            let ageText = await row.locator('td').last().textContent();
            if (age == '200') {
                await expect(row).toHaveText(' No data found ');
            } else {

                await expect(ageText).toEqual(age);

            }
        }
    }
})

test('Datepicker', async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();

    const datepicker = page.getByPlaceholder('Form Picker');
    await datepicker.click();

    const date = new Date();
    date.setDate(date.getDate() + 33);
    const expectedDate = date.getDate().toString();
    console.log('Expected date:', expectedDate);
    const expectedMonth = date.toLocaleString('En-US', { month: 'short' });
    const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' });
    const expectedYear = date.getFullYear().toString();
    const dateToAssert = expectedMonth + ' ' + expectedDate + ', ' + expectedYear;

    let calenderMonthAndYear = await page.locator('nb-calendar-view-mode').textContent() ?? '';
    let expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;

    while (!calenderMonthAndYear.includes(expectedMonthAndYear)) {
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
        calenderMonthAndYear = await page.locator('nb-calendar-view-mode').textContent() ?? '';
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, { exact: true }).click();
    expect(datepicker).toHaveValue(dateToAssert);
})

test('Circle', async ({ page }) => {

    //update Attributes
    const circle = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle');
    await circle.evaluate(node => {
        node.setAttribute('cx', '232.186');
        node.setAttribute('cy', '232.186');
    })
    circle.click();

    //Mouse movements
    const circleBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');

    //will scroll to this element
    await circleBox.scrollIntoViewIfNeeded();

    //boundingBox method starts coordinates axex in the top left corner (X=0; Y=0)
    //Y axe has positive values when its direction is down
    const box = await circleBox.boundingBox();

    //to guard code if box is NULL
    if (box) {
        //we place/recenter coords from top left corner to center of circleBox
        const x = box.x + box.width / 2;
        const y = box.y + box.height / 2;

        await page.mouse.move(x, y);//coords will be in the center of boundingBox
        await page.mouse.down();//presses left mouse button
        await page.mouse.move(x + 100, y);//moved mouse 100 px right; It is STARTING POIINT
        await page.mouse.move(x + 100, y + 100); //move mouse 100 px down
        await page.mouse.up();//release left button
        expect(circleBox).toContainText('30');
    }

})