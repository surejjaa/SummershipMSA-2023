import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";

export default class MyAccountPage extends BasePage {
    private pageTitleElement: By = By.className('page-heading');
    private myAddressesButton: By = By.xpath('//*[@id="center_column"]/div/div/ul/li[3]/a');
    private AddFirstAddressButton = By.xpath('//*[@id="center_column"]/div/div/ul/li[1]/a');

    constructor(driver: WebDriver) {
        super(driver);
    }

    public async waitForPageToLoad(timeout: number = 10000) {
        await this.driver.wait(until.elementLocated(this.pageTitleElement), timeout);
    }

    public async getPageTitle(): Promise<string> {
        const titleElement = await this.driver.findElement(this.pageTitleElement);
        const title = await titleElement.getText();
        return title;
    }

    public async checkPageTitle(expectedText: string) {
        const title = await this.getPageTitle();
        expect(title).toContain(expectedText);
    }

    async clickMyAddressesButton() {
        const myAddressesButtonElement = await this.driver.findElement(this.myAddressesButton);
        await myAddressesButtonElement.click();
    }

    async clickAddFirstAddressButton() {
        const addFirstAddressButtonElement = await this.driver.wait(until.elementLocated(this.AddFirstAddressButton), 10000);
        await addFirstAddressButtonElement.click();
    }

}
