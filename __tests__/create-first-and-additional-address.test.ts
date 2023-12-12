import { createDriver, deleteCookies, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { LoginPage } from "../core/page-objects/login-page";
import MyAccountPage from "../core/page-objects/my-account-page";
import AddressPage from "../core/page-objects/address-page";
import AddAddressPage from "../core/page-objects/add-address-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));
let driver;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let addressPage: AddressPage;
let addAddressPage: AddAddressPage;

beforeEach(async () => {
    driver = await createDriver(testData.url.home_page);
    loginPage = new LoginPage(driver);
    myAccountPage = new MyAccountPage(driver);
    addressPage = new AddressPage(driver);
    addAddressPage = new AddAddressPage(driver);
}, 9000);
describe("Test create new address", () => {
    test("test login and create the first address", async () => {
        await loginPage.navigateToLoginPage();
        await loginPage.login();
        await myAccountPage.clickAddFirstAddressButton();
        await addAddressPage.fillAddressForm();
        await addAddressPage.submitAddressForm();

        await addressPage.waitForPageToLoad(10000);
        const addressTitleElement = await addressPage.getFirstAddressTitle();
        expect(addressTitleElement).toContain("MY ADDRESS");
    }, 75000);

    test("create additional addresses", async () => {
        await loginPage.navigateToLoginPage();
        await loginPage.login();
        await myAccountPage.clickMyAddressesButton();
        await addressPage.clickAddNewAddressButton();

        const timeStamp = Date.now();
        const addressTitle = `address_${timeStamp}`;
        await addAddressPage.fillAddressForm();
        await addAddressPage.setAddressTitle(addressTitle);
        await addAddressPage.submitAddressForm();
        await addressPage.reloadPage();

        const newAddressTitle = `ADDRESS_${timeStamp}`;
        const addressTitleElement = await addressPage.getNewAddressTitle();
        expect(addressTitleElement?.toUpperCase()).toContain(newAddressTitle.toUpperCase());
    }, 75000);
    afterEach(async () => {
        await deleteCookies(driver);
    });
});

afterAll(async () => {
    await quitDriver(driver);
});
