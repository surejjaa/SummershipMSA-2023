import { By, WebDriver, WebElement, until } from "selenium-webdriver";
import * as fs from 'fs';

export default class BasePage {
    protected driver: WebDriver;
    protected emailFromFile = fs.readFileSync('email_list.json', 'utf8');
    protected emailString: string = this.emailFromFile;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    async getTitle(): Promise<string> {
        return await this.driver.getTitle();
    }

    async isMatching(selector: By, matchingItem: string): Promise<void> {
        const element = await this.findElement(selector);
        const elementText = await element.getText();
        expect(elementText).toMatch(matchingItem);
    }

    async findElement(selector: By): Promise<WebElement> {
        return await this.driver.findElement(selector);
    }

    async checkTitle(page: { getTitle: () => Promise<string> }, page_title: string) {
        let title = await page.getTitle();
        expect(title).toMatch(page_title);
    }

    async scrollToElement(element: WebElement): Promise<void> {
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", element);
    }

    async hoverElement(element: WebElement): Promise<void> {
        const actions = this.driver.actions({ bridge: true });
        await actions.move({ duration: 2000, origin: element, x: 0, y: 0 }).perform();
    }

    async excludeMarksInEmail(email: string) {
        return email = await JSON.parse(this.emailFromFile);
    }

    async searchTheProducts(searchBar: By, searchButton: By, searchInput: string): Promise<void> {
        let searchInputElement = await this.findElement(searchBar);
        await searchInputElement.sendKeys(searchInput);
        await this.findElementAndClick(searchButton);
    }

    async clearSearchInput(searchBar: By) {
        const searchInputElement = await this.findElement(searchBar);
        await searchInputElement.clear();
    }

    async findElementAndClick(selector: By) {
        await this.driver.wait(until.elementLocated(selector), 10000).click();
    }

    async checkSearchedItems(selector: By, keyWord: string) {
        const items = await this.driver.findElements(selector);
        for (let i = 0; i < items.length; i++) {
            const elementText = await items[i].getText();
            expect(elementText).toContain(keyWord);
        }
    }

    async waitAndClick(elementLocator, timeout) {
        await this.driver.wait(until.elementLocated(elementLocator), timeout).click();
    }

    async waitForElement(elementLocator, timeout) {
        return this.driver.wait(until.elementLocated(elementLocator), timeout);
    }

    async applyFilter(selector: By) {
        let filter_checkbox = await this.waitForElement(selector, 10000);
        await this.scrollToElement(filter_checkbox);
        await filter_checkbox.click();
    }

    async checkProductQuantity(selector: By, quantity: string) {
        let items = await this.driver.findElements(selector);
        let itemCount = items.length;
        console.log("product container: " + itemCount)
        await expect(itemCount.toString()).toBe(quantity);
    }
}