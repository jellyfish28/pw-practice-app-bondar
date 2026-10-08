import { Page } from "@playwright/test";

export class BaseHelper {

    protected readonly page: Page

    constructor(page: Page) {
        this.page = page;
    }


    protected async waitForNumberOfMiliseconds(timeInMs: number) {
        this.page.waitForTimeout(timeInMs * 2);
    }
}