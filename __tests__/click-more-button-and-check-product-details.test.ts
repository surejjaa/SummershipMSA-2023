import { createDriver, deleteCookies, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { LoginPage } from "../core/page-objects/login-page";
import ProductDetailsPage from "../core/page-objects/product-details-page";
import { ClothingPage } from "../core/page-objects/clothing-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver, loginPage, clothingPage, productDetailsPage;


beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    loginPage = new LoginPage(driver);
    clothingPage = new ClothingPage(driver);
    productDetailsPage = new ProductDetailsPage(driver);
});
describe("Test Product Details", () => {
    test("Check Product Details of 'Blouse' by clicking on 'More' button", async () => {
        await loginPage.navigateToLoginPage();
        await loginPage.login();
        await clothingPage.navigateToClothingPage();
        await clothingPage.selectBlouseProductUsingMoreButton();
        await productDetailsPage.getProductInfo();
        await productDetailsPage.getProductButtons();
        await productDetailsPage.getProductLinks();
        await productDetailsPage.getProductBoxInfo();
        await productDetailsPage.verifyProductDetails();
    }, 20000);
    afterEach(async () => {
        await deleteCookies(driver);
    });
});

afterAll(async () => {
    await quitDriver(driver);
});