import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";
import * as fs from 'fs';
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class LoginPage extends BasePage {
    private emailInput = By.id("email");
    private passwordInput = By.id("passwd");
    private submitButton = By.id("SubmitLogin");
    private loginButton = By.xpath("//div[@class='header_user_info']/a[@class='login']");
    private emailCreate = By.id("email_create");
    private createAccountButton = By.id("SubmitCreate");
    private forgotPasswordButton = By.xpath('//a[@title="Recover your forgotten password"]');
    private retrievePasswordButton = By.xpath('//button[@class="btn btn-default button button-medium"]');
    private confirmedMessage = By.className("alert alert-success");

    protected emailFromFile = fs.readFileSync('email_list.json', 'utf8');
    protected emailString: string = this.emailFromFile;

    constructor(driver: WebDriver) {
        super(driver);
    }

    async navigateToLoginPage() {
        await this.driver.findElement(this.loginButton).click();
    }

    public async enterEmail(email: string) {
        await this.driver.findElement(this.emailCreate).sendKeys(email);
    }

    public async clickCreateAccount() {
        await this.driver.findElement(this.createAccountButton).click();
    }

    async login(): Promise<void> {
        const emailInput = await this.driver.wait(until.elementLocated(this.emailInput), 10000);
        await emailInput.sendKeys(this.excludeMarksInEmail(this.emailString));

        const passwordInput = await this.driver.wait(until.elementLocated(this.passwordInput), 10000);
        await passwordInput.sendKeys(testData.credentials.password);

        const submitButton = await this.driver.wait(until.elementLocated(this.submitButton), 10000);
        await submitButton.click();
    }

    async generateRandomEmail(): Promise<string> {
        const randomNumber = Math.floor(Math.random() * 1000000);
        return `testuser${randomNumber}@example.com`;
    }

    async readEmailsFromJsonFile() {
        let emails: string;
        if (fs.existsSync('email_list.json')) {
            const data = fs.readFileSync('email_list.json', 'utf8');
            emails = JSON.parse(data);
        }
    }

    async writeEmailsToJsonFile(emails: string): Promise<void> {
        const data = JSON.stringify(emails, null, 2);
        fs.writeFileSync('email_list.json', data, 'utf8');
    }

    async lastEmailFromFile(): Promise<string | null> {
        let theLastEmail: string | null = null;
        if (fs.existsSync('email_list.json')) {
            const data = fs.readFileSync('email_list.json', 'utf-8');
            const emails: string[] = JSON.parse(data);
            if (emails.length > 0) {
                theLastEmail = emails[emails.length - 1];
            }
        }
        return theLastEmail;
    }

    async deleteEmailsFromFile(): Promise<void> {
        if (fs.existsSync('email_list.json')) {
            const data = fs.readFileSync('email_list.json', 'utf-8');
            let emails;
            if (data.trim() === '') {
                emails = '';
                fs.writeFileSync('email_list.json', emails, 'utf-8');
            } else {
                JSON.stringify('email_list.json', emails, '')
            }
        }
    }

    async retrieveForgottenPassword() {
        await this.driver.findElement(this.forgotPasswordButton).click();
        const emailFromFile = await this.excludeMarksInEmail(this.emailString);
        await this.driver.wait(until.elementLocated(this.emailInput), 10000).sendKeys(emailFromFile || "");
        await this.driver.findElement(this.retrievePasswordButton).click();
    }

    async checkIfConfirmationMailIsSent() {
        const emailFromFile = await this.excludeMarksInEmail(this.emailString);
        const confirmationMessageDisplayed = "A confirmation email has been sent to your address: " + emailFromFile;
        const confirmation = await this.driver.wait(until.elementLocated(this.confirmedMessage), 10000);
        const confirmationText = await confirmation.getText();
        expect(confirmationText).toMatch(confirmationMessageDisplayed);
    }
}