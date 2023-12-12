import { LoginPage } from "../core/page-objects/login-page";
import { ClothingPage } from "../core/page-objects/clothing-page";
import { CartPage } from "../core/page-objects/cart-page";
import { createDriver, deleteCookies, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver, loginPage, clothingPage, cartPage; 

beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    loginPage = new LoginPage(driver);
    clothingPage = new ClothingPage(driver);
    cartPage = new CartPage(driver);
});

describe("Purchasing a product", () => {
    test("Login and purchase product", async () => {

        await loginPage.navigateToLoginPage();
        await loginPage.login();
        await clothingPage.navigateToClothingPage();
        await clothingPage.selectItem();

        if (await cartPage.isExceptionDisplayed()) {
            await cartPage.closeErrorMessage();
        }

        await cartPage.viewCart();
        await cartPage.proceedToCheckout();
        await cartPage.fillAddressForm();
        await cartPage.addComment();
        await cartPage.submitOrder();

        expect(await cartPage.isExceptionDisplayed()).toBeFalsy();

    }, 30000);

    afterEach(async () => {
        await deleteCookies(driver);
    });
});

afterAll(async () => {
    await quitDriver(driver);
});