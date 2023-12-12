import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";

export default class AddressPage extends BasePage {
    private pageTitleElement: By = By.className('page-heading');
    private FirstAddressTitleElement: By = By.className('page-subheading');
    private NewAddressTitleElement: By = By.className('page-subheading');
    private AddNewAddressButton = By.xpath("//*[@id='center_column']/div[2]/a");

    constructor(driver: WebDriver) {
        super(driver);
    }

    async waitForPageToLoad(timeout: number = 10000) {
        await this.driver.wait(until.elementLocated(this.pageTitleElement), timeout);
    }

    async getPageTitle(): Promise<string> {
        const titleElement = await this.driver.findElement(this.pageTitleElement);
        const title = await titleElement.getText();
        return title;
    }
    async pageTitleShouldContain(expectedText: string) {
        const title = await this.getPageTitle();
        expect(title).toContain(expectedText);
    }

    async getFirstAddressTitle(): Promise<string> {
        const titleElement = await this.driver.findElement(this.FirstAddressTitleElement);
        const title = await titleElement.getText();
        return title;
    }
    async getNewAddressTitle(): Promise<string> {
        const elements = await this.driver.findElements(this.NewAddressTitleElement);
        const textFromSecondElement = await elements[1].getText();
        return textFromSecondElement;
    }
    async clickAddNewAddressButton() {
        const addNewAddressButtonElement = await this.driver.wait(until.elementLocated(this.AddNewAddressButton), 10000);
        await addNewAddressButtonElement.click();
    }
    async reloadPage() {
        await this.driver.navigate().refresh();
        await this.driver.wait(until.elementLocated(this.NewAddressTitleElement));
    }

}

