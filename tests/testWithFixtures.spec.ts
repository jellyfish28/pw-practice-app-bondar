import { test } from '../test-options';
import { faker } from '@faker-js/faker'


test('Submit Inline form', async ({ pageManager }) => {

    const firstName = faker.person.firstName();
    const email = `${firstName}${faker.number.int({ max: 100 })}@test.ua`;

    await pageManager.onFormLayoutPage().submitInlineForm(firstName, email, false);

})
