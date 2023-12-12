import { LoginPage } from "../core/page-objects/login-page";
import { createDriver, deleteCookies, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver, loginPage;

beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    loginPage = new LoginPage(driver);
});

describe("Forgot Password case", () => {
    test("Forgot Password test case - Entering the email address to retrieve a password", async () => {
        await loginPage.navigateToLoginPage();
        await loginPage.retrieveForgottenPassword();
        await loginPage.checkIfConfirmationMailIsSent();
    }, 8000);

    afterEach(async () => {
        await deleteCookies(driver);
    });
});

afterAll(async () => {
    await quitDriver(driver);
});