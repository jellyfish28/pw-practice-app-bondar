import { Page, expect } from "@playwright/test";
import { BaseHelper } from "./baseHelper";

export class DatePickerPage extends BaseHelper {

    constructor(page: Page) {
        super(page);
    }

    async selectDateFromCommonDatepickerFromToday(daysFromToday: number) {
        const datepicker = this.page.getByPlaceholder('Form Picker');
        await datepicker.click();

        let dateToAssert = await this.selectDateFromCalender(daysFromToday);
        await expect(datepicker).toHaveValue(dateToAssert);
    }

    async selectDateFromRangeCalender(startDay: number, endDay: number) {
        const datepicker = this.page.getByPlaceholder('Range Picker');
        await datepicker.click();

        const dateStart = await this.selectDateFromCalender(startDay);
        const dateTo = await this.selectDateFromCalender(endDay);
        const dateToAssert = `${dateStart} - ${dateTo}`;

        await expect(datepicker).toHaveValue(dateToAssert);
    }

    private async selectDateFromCalender(daydFromToday: number) {
        const date = new Date();
        date.setDate(date.getDate() + daydFromToday);
        const expectedDate = date.getDate().toString();
        console.log('Expected date:', expectedDate);
        const expectedMonth = date.toLocaleString('En-US', { month: 'short' });
        const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' });
        const expectedYear = date.getFullYear().toString();
        const dateToAssert = expectedMonth + ' ' + expectedDate + ', ' + expectedYear;
        console.log(dateToAssert);

        let calenderMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent() ?? '';
        let expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;

        while (!calenderMonthAndYear.includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
            calenderMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent() ?? '';
        }

        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, { exact: true }).click();

        return dateToAssert;
    }

}