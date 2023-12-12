import { By, WebDriver, until } from "selenium-webdriver";
import { readFileSync } from "fs";
import * as path from "path";
import BasePage from "./base-page";
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));
export default class AddAddressPage extends BasePage {
    private firstNameInput = By.xpath('//*[@id="firstname"]');
    private lastNameInput = By.xpath('//*[@id="lastname"]');
    private addressInput = By.xpath('//*[@id="address1"]');
    private cityInput = By.xpath('//*[@id="city"]');
    private dropdownState = By.id('uniform-id_state');
    private stateInput = By.xpath('//select[@id="id_state"]/option[@value=3]');
    private zipInput = By.xpath('//*[@id="postcode"]');
    private phoneInput = By.xpath('//*[@id="phone"]');
    private mobileInput = By.xpath('//*[@id="phone_mobile"]')
    private addressTitleInput = By.xpath('//*[@id="alias"]');
    private saveButton = By.xpath('//*[@id="submitAddress"]');

    constructor(driver: WebDriver) {
        super(driver);
    }

    async fillAddressForm(): Promise<void> {

        const firstNameInput = await this.driver.wait(until.elementLocated(this.firstNameInput));
        await firstNameInput.sendKeys(testData.new_account_checker.firstName);

        const lastNameInput = await this.driver.wait(until.elementLocated(this.lastNameInput));
        await lastNameInput.sendKeys(testData.new_account_checker.lastName);

        const addressInput = await this.driver.wait(until.elementLocated(this.addressInput));
        await addressInput.sendKeys(testData.new_account_checker.address);

        const cityInput = await this.driver.wait(until.elementLocated(this.cityInput));
        await cityInput.sendKeys(testData.new_account_checker.city);

        const dropdownState = await this.driver.wait(until.elementLocated(this.dropdownState));
        await dropdownState.click();

        const stateInput = await this.driver.wait(until.elementLocated(this.stateInput));
        await stateInput.click();

        const zipInput = await this.driver.wait(until.elementLocated(this.zipInput));
        await zipInput.sendKeys(testData.new_account_checker.zip);

        const phoneInput = await this.driver.wait(until.elementLocated(this.phoneInput));
        await phoneInput.sendKeys(testData.new_account_checker.phone);

        const mobileInput = await this.driver.wait(until.elementLocated(this.mobileInput), 10000);
        await mobileInput.sendKeys(testData.new_account_checker.zip);
    }
    async setAddressTitle(title: string) {
        const addressTitleInput = await this.driver.findElement(this.addressTitleInput);
        await addressTitleInput.clear();
        await addressTitleInput.sendKeys(title);
    }

    async submitAddressForm() {
        const saveButton = await this.driver.findElement(this.saveButton);
        await saveButton.click();
    }
}
