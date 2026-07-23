import { Page } from "@playwright/test";
import { BaseHelper } from "./baseHelper";

export class FormLayoutPage extends BaseHelper {

    constructor(page: Page) {
        super(page);
    }

    async submitUsingGridForm(email: string, password: string, option: string) {
        const form = await this.page.locator('nb-card', { hasText: 'Using the Grid' });
        await form.getByRole('textbox', { name: 'Email' }).fill(email);
        await form.getByRole('textbox', { name: 'Password' }).fill(password);
        await form.getByRole('radio', { name: option }).check({ force: true });
        await form.getByTestId("SignIn").click();
    }

    /**
     * 
     * method to submit Inline form
     * @param name - user name
     * @param email - user email
     * @param checkbox - true/false
     */
    async submitInlineForm(name: string, email: string, checkbox: boolean) {
        const form = await this.page.locator('nb-card', { hasText: 'Inline form' });
        await form.getByRole('textbox', { name: 'Jane Doe' }).fill(name);
        await form.getByRole('textbox', { name: 'Email' }).fill(email);
        if (checkbox) {
            await form.getByRole('checkbox').click({ force: true });
        }
        await form.getByRole('button').click();

    }

}