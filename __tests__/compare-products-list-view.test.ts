import { DressesPage } from "../core/page-objects/dresses-page";
import { TshirtsPage } from "../core/page-objects/tshirts-page";
import { createDriver, deleteCookies, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { ClothingPage } from "../core/page-objects/clothing-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));
let driver, dressesPage, clothingPage, tshirtsPage;

beforeAll(async () => {
    driver = await createDriver(testData.url.dresses_page);
    dressesPage = new DressesPage(driver);
    tshirtsPage = new TshirtsPage(driver);
    clothingPage = new ClothingPage(driver);
});
describe("Comparison of the products", () => {
    test("Comparison of three products from different categories in list view", async () => {
        await dressesPage.navigateToDressesPage();
        await dressesPage.checkTitle(dressesPage, testData.titles.dresses);
        await dressesPage.clickOnListViewButton();
        await dressesPage.addDressToCompare();
        await tshirtsPage.navigateToTshirtsPage();
        await tshirtsPage.addTshirtToCompare();
        await clothingPage.navigateToClothingPage();
        await clothingPage.addBlouseToCompare();
        await clothingPage.checkComparionPageHeader();
        await clothingPage.checkProductComparison();
        await clothingPage.checkProductLocation();
    }, 9000);
    afterEach(async () => {
        await deleteCookies(driver);
    });
});

afterAll(async () => {
    await quitDriver(driver);
});
