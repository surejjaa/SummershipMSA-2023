import { ClothingPage } from "../core/page-objects/clothing-page";
import { CartPage } from "../core/page-objects/cart-page";
import { createDriver, deleteCookies, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver, clothingPage, cartPage;

beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    clothingPage = new ClothingPage(driver);
    cartPage = new CartPage(driver);
});

describe("Adding and removing products from the cart", () => {
    test("Changing product quantity in the cart by adding multiple products and removing them from the cart", async () => {
    
        await clothingPage.navigateToClothingPage();
        await clothingPage.selectItem();
        if (await cartPage.isExceptionDisplayed()) {
            await cartPage.closeErrorMessage();
        }
        
        await clothingPage.navigateToClothingPage();
        await clothingPage.addAnotherItemToCart();
        if (await cartPage.isExceptionDisplayed()) {
            await cartPage.closeErrorMessage();
        }
    
        await cartPage.viewCart();
        await cartPage.deleteItemFromCart();
        if (await cartPage.isTechnicalErrorDisplayed()) {
            await cartPage.closeErrorMessage();
        }

    }, 15000);

    afterEach(async () => {
        await deleteCookies(driver);
    });
});

afterAll(async () => {
    await quitDriver(driver);
});