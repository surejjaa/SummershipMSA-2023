import { By, WebDriver, until } from "selenium-webdriver";
import { readFileSync } from "fs";
import * as path from "path";
import BasePage from "./base-page";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class CartPage extends BasePage {
    private viewCartButton = By.xpath("//a[@title='View my shopping cart']");
    private proceedToCheckoutButton = By.xpath("//p[@class='cart_navigation clearfix']/a[@title='Proceed to checkout']");
    private commentTextArea = By.xpath("//textarea[@class='form-control']");
    private submitOrderButton = By.xpath("//button[@name='processAddress']");
    private exceptionMessage = By.id("psException");
    private closeButton = By.xpath('//a[@title="Close"]');
    private technicalError = By.xpath('//p[@class="fancybox-error"]');
    private binButton = By.xpath('//tr[@class="cart_item first_item address_0 odd"]/td[@class="cart_delete text-center"]/div');
    private addressInput = By.id('address1');
    private cityInput = By.id('city');
    private dropdownState = By.id('uniform-id_state');
    private stateInput = By.xpath('//select[@id="id_state"]/option[@value=3]');
    private phoneInput = By.id('phone');
    private zipInput = By.id('postcode');
    private mobileInput = By.id('phone_mobile');
    private saveAddressButton = By.id('submitAddress');

    constructor(driver: WebDriver) {
        super(driver);
    }

    async closeErrorMessage() {
        const closeError = await this.driver.wait(until.elementLocated(this.closeButton), 15000);
        await this.driver.actions().move({ origin: closeError }).click().perform();
    }

    async viewCart() {
        const cart = await this.driver.wait(until.elementLocated(this.viewCartButton), 10000);
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", cart);
        await cart.click();
    }

    async deleteItemFromCart() {
        const bin = await this.driver.wait(until.elementLocated(this.binButton), 10000);
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", bin);
        await bin.click();
    }

    async proceedToCheckout() {
        const proceed = await this.driver.findElement(this.proceedToCheckoutButton);
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", proceed);
        await proceed.click();
    }

    async addComment() {
        const commentElement = await this.driver.wait(until.elementLocated(this.commentTextArea), 10000);
        await commentElement.click();
        await commentElement.sendKeys(testData.order.comment);
    }

    async fillAddressForm(): Promise<void> {
        const addressInput = await this.driver.wait(until.elementLocated(this.addressInput), 10000);
        await addressInput.sendKeys(testData.new_account_checker.address);

        const cityInput = await this.driver.wait(until.elementLocated(this.cityInput), 10000);
        await cityInput.sendKeys(testData.new_account_checker.city);

        const dropdownState = await this.driver.wait(until.elementLocated(this.dropdownState), 10000);
        await dropdownState.click();

        const stateInput = await this.driver.wait(until.elementLocated(this.stateInput), 10000);
        await stateInput.click();

        const zipInput = await this.driver.wait(until.elementLocated(this.zipInput), 20000);
        await zipInput.sendKeys(testData.new_account_checker.zip);

        const phoneInput = await this.driver.wait(until.elementLocated(this.phoneInput), 10000);
        await phoneInput.sendKeys(testData.new_account_checker.phone);

        const mobileInput = await this.driver.wait(until.elementLocated(this.mobileInput), 10000);
        await mobileInput.sendKeys(testData.new_account_checker.zip);

        const saveAddressButton = await this.driver.wait(until.elementLocated(this.saveAddressButton), 10000);
        await saveAddressButton.click();
    }

    async submitOrder() {
        const submitOrder = await this.driver.findElement(this.submitOrderButton);
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", submitOrder);
        await submitOrder.click();
    }

    async isExceptionDisplayed() {
        try {
            await this.driver.findElement(this.exceptionMessage);
            return true;
        } catch {
            return false;
        }
    }

    async isTechnicalErrorDisplayed() {
        try {
            return await this.driver.findElement(this.technicalError).isDisplayed();
        } catch (exceptionMessage) {
            return exceptionMessage;
        }
    }
}