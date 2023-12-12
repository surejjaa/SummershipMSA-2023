import { createDriver, quitDriver } from "../../core/config/driver-setup";
import { LoginPage } from "../../core/page-objects/login-page";
import UserDetailsFormPage from "../../core/page-objects/user-details-form-page";
import MyAccountPage from "../../core/page-objects/my-account-page";
import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver, loginPage, userDetailsFormPage, myAccountPage;


describe('Register New Account Test', () => {
    beforeAll(async () => {
        driver = await createDriver(testData.url.home_page);
        loginPage = new LoginPage(driver);
        userDetailsFormPage = new UserDetailsFormPage(driver);
        myAccountPage = new MyAccountPage(driver);
        //checking if the email_list is empty; if it's not => delete all emails from the file
        await loginPage.deleteEmailsFromFile();
    });

    it('Register new user and go to My Account page', async () => {
        let newEmail = loginPage.generateRandomEmail();
        loginPage.writeEmailsToJsonFile(await newEmail);
        await loginPage.navigateToLoginPage();
        await loginPage.enterEmail(await newEmail);
        await loginPage.clickCreateAccount();
        await userDetailsFormPage.waitForPageToLoad(10000);

        await userDetailsFormPage.enterFirstName(testData.new_account_checker.firstName);
        await userDetailsFormPage.enterLastName(testData.new_account_checker.lastName);
        await userDetailsFormPage.enterPassword(testData.new_account_checker.password);
        await userDetailsFormPage.selectDay(testData.new_account_checker.day);
        await userDetailsFormPage.selectMonth(testData.new_account_checker.month);
        await userDetailsFormPage.selectYear(testData.new_account_checker.year);
        await userDetailsFormPage.clickRegisterButton();

        await myAccountPage.waitForPageToLoad(10000);
        const pageTitle = await myAccountPage.getPageTitle();
        expect(pageTitle).toContain("MY ACCOUNT");
    }, 9000);
});

afterAll(async () => {
    await quitDriver(driver);
});
