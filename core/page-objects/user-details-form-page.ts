import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";

export default class UserDetailsFormPage extends BasePage {
    private firstNameInput = By.id('customer_firstname');
    private lastNameInput = By.id('customer_lastname');
    private passwordInput = By.id('passwd');
    private daysInput = By.id('days');
    private monthsInput = By.id('months');
    private yearsInput = By.id('years');
    private registerButton = By.id('submitAccount');

    constructor(driver: WebDriver) {
        super(driver);
    }

    public async enterFirstName(firstName: string) {
        await this.driver.findElement(this.firstNameInput).sendKeys(firstName);
    }

    public async enterLastName(lastName: string) {
        await this.driver.findElement(this.lastNameInput).sendKeys(lastName);
    }

    public async enterPassword(password: string) {
        await this.driver.findElement(this.passwordInput).sendKeys(password);
    }

    public async selectDay(day: string) {
        await this.driver.findElement(this.daysInput).sendKeys(day);
    }

    public async selectMonth(month: string) {
        await this.driver.findElement(this.monthsInput).sendKeys(month);
    }

    public async selectYear(year: string) {
        await this.driver.findElement(this.yearsInput).sendKeys(year);
    }

    public async waitForPageToLoad(timeout: number = 10000) {
        await this.driver.wait(until.elementLocated(this.firstNameInput), timeout);
    }

    public async clickRegisterButton() {
        await this.driver.findElement(this.registerButton).click();
    }
    public async waitUntilFirstNameInputLocated(timeout: number = 5000): Promise<void> {
        await this.driver.wait(until.elementLocated(this.firstNameInput), timeout);
    }
}