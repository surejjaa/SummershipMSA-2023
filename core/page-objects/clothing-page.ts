import { By, WebDriver, WebElement, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class ClothingPage extends BasePage {
    private blouseItem = By.xpath('//div[@class="product-image-container"]/a[@title="Blouse"]');
    private dressItem = By.xpath('//div[@class="product-image-container"]/a[@title="Printed Chiffon Dress"]');
    private addBlouseToCartButton = By.xpath('//div[@class="button-container"]/a[@data-id-product="2"]');
    private addDressToCartButton = By.xpath('//div[@class="button-container"]/a[@data-id-product="7"]');
    private navigateButton = By.xpath('//div[@id="block_top_menu"]/ul/li[1]/a');
    private blouseImageLink = By.xpath("//*[@id='center_column']/ul/li[2]/div/div[2]/h5/a");
    private compareBlouse = By.xpath('//div[@class="compare"]//a[@data-id-product="2"]');
    private womenHeader = By.className('cat-name');
    private compareButton = By.className('btn btn-default button button-medium bt_compare bt_compare');
    private comparisonHeader = By.className('page-heading');
    private productsForComparison = By.className('product-image-block');
    private product1 = By.className('ajax_block_product comparison_infos product-block product-1');
    private product2 = By.className('ajax_block_product comparison_infos product-block product-2');
    private product3 = By.className('ajax_block_product comparison_infos product-block product-4');
    private blouseMoreButton = By.xpath('//*[@id="center_column"]/ul/li[2]/div/div[2]/div[2]/a[2]/span');

    constructor(driver: WebDriver) {
        super(driver);
    }

    async navigateToClothingPage() {
        await this.driver.wait(until.elementLocated(this.navigateButton), 10000).click();
        await this.checkHeader();
    }

    async hoverElement(item: WebElement) {
        const actions = this.driver.actions({ bridge: true });
        await actions.move({ duration: 5000, origin: item, x: 0, y: 0 }).perform();
    }

    async selectItem() {
        const item = await this.driver.findElement(this.blouseItem);
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", item);
        await this.hoverElement(item);
        await this.driver.findElement(this.addBlouseToCartButton).click();
    }
    async selectBlouseProduct() {
        const BlouseProductElement = await this.driver.findElement(this.blouseImageLink);
        await BlouseProductElement.click();
    }

    async hoverBlouseProduct() {
        const blouseProductElement = await this.driver.findElement(this.blouseItem);
        await this.hoverElement(blouseProductElement);
    }

    async selectBlouseProductUsingMoreButton() {
        await this.hoverBlouseProduct();
        const blouseMoreButtonElement = await this.driver.findElement(this.blouseMoreButton);
        await blouseMoreButtonElement.click();
    }

    async addAnotherItemToCart() {
        const item2 = await this.driver.wait(until.elementLocated(this.dressItem), 5000);
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", item2);
        await this.hoverElement(item2);
        await this.driver.findElement(this.addDressToCartButton).click();
    }
    async checkHeader() {
        await this.driver.wait(until.elementLocated(this.womenHeader), 10000);
        await this.isMatching(this.womenHeader, testData.headers.women);
    }
    async addBlouseToCompare() {
        await this.findElementAndClick(this.compareBlouse);
    }
    async checkComparionPageHeader() {
        await this.findElementAndClick(this.compareButton);
        await this.isMatching(this.comparisonHeader, testData.headers.comparison);
    }
    async checkProductComparison() {
        let products = await this.driver.findElements(this.productsForComparison);
        let count = products.length;
        await expect(count).toBe(3);
    }
    async checkProductLocation() {
        const product1Element = await this.driver.findElement(this.product1);
        const product2Element = await this.driver.findElement(this.product2);
        const product3Element = await this.driver.findElement(this.product3);

        const product1Rect = await product1Element.getRect();
        const product2Rect = await product2Element.getRect();
        const product3Rect = await product3Element.getRect();

        const distanceThreshold = 295;
        const distanceX1 = Math.abs(product1Rect.x - product2Rect.x);
        const distanceX2 = Math.abs(product2Rect.x - product3Rect.x);
        expect(distanceX1).toBeLessThanOrEqual(distanceThreshold);
        expect(distanceX2).toBeLessThanOrEqual(distanceThreshold);
    }
}