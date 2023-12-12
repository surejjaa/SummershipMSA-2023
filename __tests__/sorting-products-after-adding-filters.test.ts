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

describe("Sorting and filtering products ", () => {
    test("Sorting products after adding some filters", async () => {
        await dressesPage.navigateToDressesPage();
        await dressesPage.checkTitle(dressesPage, testData.titles.dresses);
        await dressesPage.isSortBySectionDisplayed();
        await dressesPage.chooseSortingOption();
        await dressesPage.addFiltersFromDifferentSections(); 
        await dressesPage.checkEnabledFilters();
        
    },50000);
    afterEach(async () => {
        await deleteCookies(driver);
    });
});

afterAll(async () => {
    await quitDriver(driver);
},25000);
