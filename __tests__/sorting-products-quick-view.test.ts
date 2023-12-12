import { DressesPage } from "../core/page-objects/dresses-page";
import { createDriver, deleteCookies, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver, dressesPage;

beforeAll(async () => {
    driver = await createDriver(testData.url.dresses_page);
    dressesPage = new DressesPage(driver);
});

describe("Sorting products", () => {
    test("Sorting products after clicking on quick view", async () => {
        await dressesPage.navigateToDressesPage();
        await dressesPage.checkTitle(dressesPage, testData.titles.dresses);
        await dressesPage.checkSortBySection();
        await dressesPage.sortingProductsFromTheLowestPriceFirst();
        await dressesPage.checkSortFromTheLowestPrice();
    }, 10000);
    afterEach(async () => {
        await deleteCookies(driver);
    });
});

afterAll(async () => {
    await quitDriver(driver);
});
