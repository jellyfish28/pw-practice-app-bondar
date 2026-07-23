import { Locator, Page } from "@playwright/test";
import { BaseHelper } from "./baseHelper";

export class NavigationPage extends BaseHelper {

    readonly formLayout: Locator;
    readonly toastrMenu: Locator;
    readonly tooltipMenu: Locator;
    readonly tableMenu: Locator;
    readonly datepikerMenu: Locator;

    constructor(page: Page) {
        super(page);
        this.formLayout = page.getByText('Form Layout');
        this.toastrMenu = page.getByText('Toastr');
        this.tooltipMenu = page.getByText('Tooltip');
        this.tableMenu = page.getByText('Smart table');
        this.datepikerMenu = page.getByText('Datepicker');
    }

    async navigateToFormsPage() {
        this.waitForNumberOfMiliseconds(1);
        await this.selectGroupMenuItem('Forms');
        await this.formLayout.click();
    }

    async navigateToToastrPage() {
        await this.page.getByText('Modal & Overlays').click();
        await this.toastrMenu.click();
    }

    async navigateToTooltipPage() {
        await this.page.getByText('Modal & Overlays').click();
        await this.tooltipMenu.click();
    }

    async navigateToSmartTablePage() {
        await this.page.getByText('Tables & Data').click();
        await this.tableMenu.click();
    }

    async navigateToDatepickerPage() {
        await this.selectGroupMenuItem('Forms');
        await this.datepikerMenu.click();
    }

    private async selectGroupMenuItem(groupItem: string) {
        const groupSelectItem = this.page.getByTitle(groupItem);
        const expandedItem = await groupSelectItem.getAttribute('aria-expanded');

        if (expandedItem == 'false') {
            await groupSelectItem.click()
        }
    }
}
