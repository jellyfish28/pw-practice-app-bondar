import { test, expect } from '@playwright/test';

// test.beforeEach(async ({ page }, testInfo) => {
//     await page.goto(process.env.URL || 'http://uitestingplayground.com/ajax');
//     await page.getByText('Button Triggering Ajax Request').click();

//     testInfo.setTimeout(testInfo.timeout + 2000); //will add 2 sec to each test timeout, so if the test timeout is 30 sec, it will be 32 sec for this test
// });

// test('auto waiting', async ({ page }) => {
//     const button = page.locator('.bg-success');

//     //auto wait 30sec
//     //await button.click();

//     //auto wait 30 sec
//     //const buttonTetxt = await button.textContent();
//     //expect(buttonTetxt).toBe('Data loaded with AJAX get request.');


//     //allTextContents() - won't autowait-->use waitFor() to wait for the element to be attached to the DOM
//     //await button.waitFor({ state: 'attached' });
//     // const buttonText = await button.allTextContents();
//     //expect(buttonText).toContain('Data loaded with AJAX get request.');


//     //toHaveText() - will auto wait for the assertion to pass, it will wait up to 5 sec for the assertion to pass
//     await expect(button).toHaveText('Data loaded with AJAX get request.', { timeout: 30000 });
// })

// test('alternative waits', async ({ page }) => {
//     const button = page.locator('.bg-success');

//     //1. waitForSelector() - will wait for the element to be attached to the DOM, it will wait up to 30 sec for the element to be attached to the DOM
//     //await page.waitForSelector('.bg-success');

//     //2. waitforResponse() - will wait for the response to be received, it will wait up to 30 sec for the response to be received
//     //await page.waitForResponse('http://uitestingplayground.com/ajax');

//     //3. NOT RECOMMENDED -->waitForLoadState() - will wait for the page to be fully loaded, it will wait up to 30 sec for the page to be fully finish ALL requests
//     await page.waitForLoadState('networkidle');

//     const buttonText = await button.allTextContents();
//     expect(buttonText).toContain('Data loaded with AJAX get request.');
// })

// test('timeouts', async ({ page }) => {
//     test.setTimeout(30000); //set timeout for the test to 30 sec

//     //test.slow() - slow down the test execution by 3x, it will wait up to 30 sec for the test to finish

//     const button = page.locator('.bg-success');

//     await button.click({ timeout: 10000 }); //click will wait up to 10 sec for the element to be attached to the DOM
// })

test('auto waiting on bondat academy', async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard');
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Dialog').click();

    const dialogWithDelay = page.locator('nb-card', { hasText: 'Open Dialog With Delay' });
    dialogWithDelay.getByRole('button', { name: 'Open with delay 3 seconds' }).click();


    //click() has inbuilt wait mechanism, it will wait for the element to be attached to the DOM, visible and enabled before clicking
    const dialogPopUp = page.locator('nb-dialog-container');
    await dialogPopUp.getByRole('button', { name: 'Ok' }).click();
})

test('Alternative auto waiting on bondat academy', async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard');
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Dialog').click();

    const dialogWithDelay = page.locator('nb-card', { hasText: 'Open Dialog With Delay' });
    await dialogWithDelay.getByRole('button', { name: 'Open with delay 3 seconds' }).click();

    const dialogPopUp = page.locator('nb-dialog-container');

    //1.
    //await dialogPopUp.waitFor();// will wait for ElementHandle to be attached to the DOM, visible and enabled before clicking
    //2.
    //await page.waitForSelector('nb-dialog-container');//will wait for the element to be visible in the DOM before clicking
    //3.
    //await page.waitForResponse('**/api/delay/3');//will wait for the response to be received before clicking
    //4. 
    //await page.waitForLoadState('networkidle');//will wait for the page to be fully loaded before clicking (NOT RECOMMENDED)
    //5.
    //await page.waitForTimeout(3500);//will wait for 3 seconds before clicking (NOT RECOMMENDED)


    //const dialogPopUpText = await dialogPopUp.locator('nb-card-header').allTextContents();
    //expect(dialogPopUpText).toContain('Friendly reminder');

    //6. 
    await expect(dialogPopUp.locator('nb-card-header')).toHaveText('Friendly reminder');//locator assertion will wait for the element to be visible in the DOM before clicking
})