1. npm install --force
2. npm init playwright@latest - to init PW
3. run tests --> npx playwright test -- will runn ALL tests across ALL projects from PW config

3.1 npx playwright test --headed - will run with browser opened
npx playwright test --project=chromium --headed - will run only one project

cd pw-practice-app
npx playwright test tests/firstTest.spec.ts --project=chromium --ui - in PW window

npx playwright test -g "basic test"  --project=chromium --ui - will run a specific test from spec file

3.2 to show report: npx playwright show-report

3.3 also add to tsconfig.json : "types": [
      "node"
    ], - to not see types related errors

3.4 you can choose in Test explorer-->in Settings-->Show trace viewer
and it will show you trace after test run like in ui mode

3.5. in terminal npx playwright test tests/firstTest.spec.ts --project=chromium --trace on - will exec tests in headless mode but in show-report will leave trace
npx playwright show-report - will show reprort with trace

trace: 'on-first-retry' in PW config - will grab report on 1st retry

npx playwright test tests/firstTest.spec.ts --project=chromium  --debug - will open debug mode where you can step over lines of code

3.6 debug via VScode: 1.put breakpoint; 2. run test in Test Explorer in debug mode

4. page is fixture in PW; it is like a new browser page
test.beforeEach - is a hook
test.beforeAll - will be execute once before all test
test.afterEach - after each test
test.afterAll - once after All tests

5. user-facing Locators
https://bondaracademy.com/blog/how-to-use-getbyrole-in-playwright - to see mapping getByRole

test.describe.skip or test.skip
5. test.describe.only - only this test will be executed or test.only


6. autoWaiting.spec.ts

allTextContents() - has NO wait timeout

click() has in-built wait

timweouts: in PW config: property-->timeout: 30000 (by default; test timeout)

globalTimeout: 60000 (by default -->No default in PW config)

in PW config in use property in use block: actionTimeout: 4000 (for click()); 

expect: {
    timeout: 5000, // Maximum time expect() should wait for the condition to be met.
  },

await button.click({ timeout: 4000 }); - will override PW config.ts timeouts

.toHaveText('Friendly reminder', {timeout:4000})

test.setTimeout(30000) in the test itself will increase specific test time

test.slow()- will increase test default timeout *3 times; used in test itself

test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByText('Button Triggering Ajax Request').click();

    testInfo.setTimeout(testInfo.timeout + 2000); 
    //will add 2 sec to each test timeout, so if the test timeout is 30 sec, it will be 32 sec for this test file
});

7. code generator
- it Test explorer-->Tools->Pick locator
it will generate locators for you

- record new
will record your actions with locators; the whole script

- record at cursor - will proceed your test scripting fro place where you left cursor

8. Tooltips
Cmd+\ - and in Source you will pause on Breakpoint and in Elements->you will grab locator for tooltip

9. Dialog; event listeners
//event listener; initialize before the action that triggers the dialog box
    page.on('dialog', async dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?');
        await dialog.accept();
    });

14. to run specific file

npx playwright test uiComponents.spec.ts --project=chromium

14.1 Step decorator; on fail in pw report you will see exect step which failed; for this use @step annotation for each method

https://playwright.dev/docs/api/class-test#test-step - helpers folder-->test-decorator-step.ts. code pasted from PW docs function: step()
You can use TypeScript method decorators to turn a method into a step. Each call to the decorated method will show up as a step in the report.

in tsconfig add to support this feature
"experimentalDecorators": true,

retry will work only using command line NOT ui mode bcs main purpose is CI/CD


15. to run using scripts from package.json

npm run firstTest-chromium

16. faker

download via npm
'@faker-js/faker'

save also into dependencies

npm i @faker-js/faker --save-dev --force
usage: pageObject.js

17. retries
worker - instance of Browser

in uiComponents
//it has more Priority than PW config
in test.describe (all tests in that block will be executed 2 times)
test.describe.configure({ retries: 2 })

when Retry is ON Worker#2 is created and runs Failed test again
if Retry is OFF then Worker#2 is created but runs the next test of the Queu w/o re-run Failed test

on PW config
retries: process.env.CI ? 2 : 0, -->0 means 0 retries locally;but 2retries on CI

18. parallel
for each spec file a separate worker
max 5 workers in parallel

PW config:
workers: process.env.CI ? 1 : undefined, - on CI 1, locally 5(depends on cores and CPU of PC)
workers: process.env.CI ? 1 : 1 - locally ALL spec files will be executed one by one + if fullyParallel: false; bcs only one worker will be triggered
fullyParallel: true, - will run in parallel in ALL framework
fullyParallel: false, - will run in parallel spec files BUT will run in sequence in a specific spec file

workers: process.env.CI ? 1 : 1 - wil exec test sequencially

test.describe.parallel - will execute tests in parallel

test.describe.configure({ mode: 'serial' }) - will exec tests sequentially

test.describe.configure({ mode: 'parallel' }) - in the beginning of file will exec all test in parallel in spec file


//will run tests in parallel in chromium project
 {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      fullyParallel: true //can run tests in parallel only e.g. in  Chrome
    },

19. 
screenshot for whole page (pageObject)

will create folder screenshots
await page.screenshot({ path: 'screenshots/inlineForm.png' })
    

    screenshot for specific element
    await page.locator('nb-card', { hasText: 'Inline form' }).screenshot({ path: 'screenshots/inlineFormAfterSubmit.png' })    

20. in test-results will be videos

pw config:
video: {
      mode: 'on',
      size: { width: 1920, height: 1080 }
    }

    will shoot video but only in browser mode not headed
    thus run npm run firstTest-chromium  
    video will be saved in playwright-report->data folder; but to open them open index.html report and videos will be attached there  

21.   to run test in diff envs:
21.1 baseURL: 'http://localhost:4200/' in use section; PW config
21.2 in projects section:

 // {
    //   name: 'dev',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     baseURL: 'http://localhost:4200/'
    //   },

    // },
    // {
    //   name: 'staging',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     baseURL: 'http://localhost:4201/'
    //   },

    // },

    to run on dev use:

    npx playwright test firstTest.spec.ts --project=dev

 22. if you want to add new Env variables (your own)-->create test-options.ts   

 also in PW config import type { TestOptions } from './test-options';

 and in use section:
 globalQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',

 and in dragNDrop test import
 import { test } from '../test-options'

 then in test
 test.beforeEach(async ({ page, globalQaURL }) => {
    await page.goto(globalQaURL);
});

23. Read environment variables from file. (PREFERABLE way)
 * https://github.com/motdotla/dotenv 

another way to create .env in root of Project
autoWaiting test
await page.goto(process.env.URL || 'http://uitestingplayground.com/ajax');

IN PW:
baseURL: process.env.URL

also you can have a separate .env.qa file for another ENVIRONMENT

also download npm i dotenv --save-dev --force

and uncomment in PW cofig
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });//will read data from .env

also you can add username/password to .env
and use them in test pageObjects:

await pageManager.onFormLayoutPage().submitUsingGridForm(process.env.USERNAME!, process.env.PASSWORD!, 'Option 2');

add .env to .gitignore

dotenv.config({ path: path.resolve(__dirname, process.env.TEST_ENV ? `.env.${process.env.TEST_ENV}` : '.env') }); - use this approach to switch between env files: .env or .env.qa

run tests using: "firstTest-chromium:qa" //qa prefix will be taken; only by this command variables will be taken from a specific file
    
24. without .env file but via CLI

URL=http://uitestingplayground.com/aja npx playwright test firstTest.spec.ts --project=chromium"

to test it comment in .env file URL prop

also you can add script "autoWaiting-chromium" into package.json

25. also you can manage diff URLs via:

use section:
baseURL: process.env.DEV === '1' ? 'http://localhost:4200/' : process.env.STAGING === '1' ? 'http://localhost:4201/' : 'http://localhost:4200/'

then in CLI

DEV=1 npx playwright test firstTest.spec.ts --project=chromium

26. config file PW

you can redefine all props from Global config in project level config
{
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      //retries: 1,
      //fullyParallel: true //can run tests in parallel only e.g. in  Chrome
    },

also in use block of specific project you can redefine props from Global use block
{
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        //baseURL: 'http://localhost:4200/'
      },

    }
you can create project only for specific spec file
{
      name: 'pageObjectsFullScreen',
      testMatch: 'pageObject.spec.ts',
      use: {
        video: {
          mode: 'on',
          size: { width: 1920, height: 1080 }
        }
      },
    }    

you can have another pw config file like prod
to run with specific config
npx playwright test --config=playwrightconfig-prod.config.ts