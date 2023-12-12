import { createDriver, deleteCookies, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { DressesPage } from "../core/page-objects/dresses-page";
const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver, dressesPage;

beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    dressesPage = new DressesPage(driver);
});

describe("Filtering the items", () => {
    test("Filtering the items by price range test case - Changing the price range slider", async () => {
        await dressesPage.navigateToDressesPage();
        await dressesPage.checkTitle(dressesPage, testData.titles.dresses);
        await dressesPage.storeAllDresses();
        await dressesPage.findPriceRangeSection();
        await dressesPage.changePriceRange();
        await dressesPage.checkFilteredPrices();
        await dressesPage.checkNumberOfShowingItems(testData.price.items);
        await dressesPage.applyFilters();
        await dressesPage.checkNumberOfShowingItems(testData.price.filters);
    }, 30000);

    afterEach(async () => {
        await deleteCookies(driver);
    });
});

afterAll(async () => {
    await quitDriver(driver);
});