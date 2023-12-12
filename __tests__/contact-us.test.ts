import { ContactPage } from "../core/page-objects/contact-page";
import { createDriver, deleteCookies, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver, contactPage;

beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    contactPage = new ContactPage(driver);
});

describe("Contacting the webshop case", () => {
    test("Contact Us using Valid Information test case - Customer Service Feedback", async () => {
        await contactPage.navigateToContactPage();
        await contactPage.checkIfCustomerServicePageIsLoaded();
        await contactPage.fillOutContactForm();
        await contactPage.clickOnSendMessageButton();
        await contactPage.verifyConfirmationMessage();
    }, 15000);

    afterEach(async () => {
        await deleteCookies(driver);
    });
});

afterAll(async () => {
    await quitDriver(driver);
});