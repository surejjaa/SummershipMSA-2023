import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";
import * as fs from 'fs';
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class ContactPage extends BasePage {
    private header = By.className("page-heading bottom-indent");
    private contactUsButton = By.xpath("//a[@title='Contact us']");
    private messageSection = By.xpath("//h3[@class='page-subheading']");
    private subjectHeading = By.xpath("//select[@id='id_contact']/option[@value='2']");
    private emailInput = By.id("email");
    private orderReference = By.id("id_order");
    private messageInput = By.id("message");
    private submitButton = By.id("submitMessage");
    private confirmationMessage = By.className("alert alert-success");
    
    protected emailFromFile = fs.readFileSync('email_list.json', 'utf8');
    protected emailString: string = this.emailFromFile;

    constructor(driver: WebDriver) {
        super(driver);
    }

    async navigateToContactPage() {
        await this.driver.findElement(this.contactUsButton).click();
    }

    async checkIfCustomerServicePageIsLoaded(){
        const contactUsHeading = await this.driver.wait(until.elementLocated(this.header), 10000);
        const headingText = await contactUsHeading.getText();
        expect(headingText).toMatch(testData.titles.contact_page);
    }

    async fillOutContactForm(){
        await this.driver.findElement(this.messageSection);
        await this.driver.wait(until.elementLocated(this.subjectHeading)).click();
        const emailInput = await this.driver.wait(until.elementLocated(this.emailInput), 10000);
        await emailInput.sendKeys(this.excludeMarksInEmail(this.emailString));
        const orderInput = await this.driver.wait(until.elementLocated(this.orderReference), 10000);
        await orderInput.sendKeys(testData.order.reference);
        const messageInput = await this.driver.wait(until.elementLocated(this.messageInput), 10000);
        await messageInput.sendKeys(testData.order.message);
    }

    async clickOnSendMessageButton (){
        await this.driver.wait(until.elementLocated(this.submitButton), 10000).click();
    }

    async verifyConfirmationMessage(){
        const confirmation = await this.driver.wait(until.elementLocated(this.confirmationMessage), 10000);
        const confirmationText = await confirmation.getText();
        expect(confirmationText).toMatch(testData.order.confirmation);
    }
}