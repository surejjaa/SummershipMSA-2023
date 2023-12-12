import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class TshirtsPage extends BasePage {
    private navigateToTshirtsButton = By.xpath('//a[@title="T-shirts"]');
    private compareTshirt = By.xpath('//div[@class="compare"]//a[@data-id-product="1"]');
    private header = By.className('cat-name');

    constructor(driver: WebDriver) {
        super(driver);
    }

    async navigateToTshirtsPage() {
        const navigation = await this.driver.wait(until.elementsLocated(this.navigateToTshirtsButton), 10000);
        await navigation[1].click();
    }
    async checkHeader() {
        await this.driver.wait(until.elementLocated(this.header), 10000);
        await this.isMatching(this.header, testData.headers.tshirts);
    }
    async addTshirtToCompare() {
        await this.checkHeader();
        await this.findElementAndClick(this.compareTshirt);
    }
}