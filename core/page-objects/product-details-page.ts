import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";

export default class ProductDetailsPage extends BasePage {
    private productTitle = By.xpath('//*[@id="center_column"]/div/div/div[3]/h1');
    private productReference = By.xpath('//*[@id="product_reference"]');
    private productCondition = By.xpath('//*[@id="product_condition"]');
    private productDescription = By.xpath('//*[@id="short_description_block"]');
    private sendToFriendButton = By.xpath('//*[@id="usefull_link_block"]/li[1]');
    private printButton = By.xpath('//*[@id="usefull_link_block"]/li[2]');
    private productQuantityWanted = By.xpath('//*[@id="quantity_wanted"]');
    private productColorWhite = By.xpath('//*[@id="color_to_pick_list"]//a[@name="White"]');
    private productColorBlack = By.xpath('//*[@id="color_to_pick_list"]//a[@name="Black"]');
    private addToCartButton = By.xpath('//*[@id="add_to_cart"]/button');
    private availableItems = By.xpath('//*[@id="pQuantityAvailable"]');
    private productPrice = By.xpath('//*[@id="our_price_display"]');
    private productSize = By.xpath('//*[@id="attributes"]/fieldset[1]/div');
    private twitterShareButton = By.xpath('//*[@id="center_column"]/div/div/div[3]/p[7]/button[1]');
    private facebookShareButton = By.xpath('//*[@id="center_column"]/div/div/div[3]/p[7]/button[2]');
    private googlePlusShareButton = By.xpath('//*[@id="center_column"]/div/div/div[3]/p[7]/button[3]');
    private pinterestShareButton = By.xpath('//*[@id="center_column"]/div/div/div[3]/p[7]/button[4]');

    constructor(driver: WebDriver) {
        super(driver);
    }
    async waitForPageToLoad(timeout: number = 10000) {
        await this.driver.wait(until.elementLocated(this.productTitle), 10000);
    }

    async getProductTitle(): Promise<string> {
        await this.waitForPageToLoad();
        const element = await this.driver.wait(until.elementLocated(this.productTitle), 10000);
        return element.getText();
    }

    async getProductReference(): Promise<string> {
        const element = await this.driver.wait(until.elementLocated(this.productReference), 10000);
        return element.getText();
    }

    async getProductCondition(): Promise<string> {
        const element = await this.driver.wait(until.elementLocated(this.productCondition), 10000);
        return element.getText();
    }

    async getProductDescription(): Promise<string> {
        const element = await this.driver.wait(until.elementLocated(this.productDescription), 10000);
        return element.getText();
    }

    async getAvailableItems(): Promise<string> {
        const element = await this.driver.wait(until.elementLocated(this.availableItems), 10000);
        return element.getText();
    }

    async isTwitterShareButtonAvailable(): Promise<boolean> {
        const element = await this.driver.findElements(this.twitterShareButton);
        return element.length > 0;
    }

    async isFacebookShareButtonAvailable(): Promise<boolean> {
        const element = await this.driver.findElements(this.facebookShareButton);
        return element.length > 0;
    }

    async isGooglePlusShareButtonAvailable(): Promise<boolean> {
        const element = await this.driver.findElements(this.googlePlusShareButton);
        return element.length > 0;
    }

    async isPinterestShareButtonAvailable(): Promise<boolean> {
        const element = await this.driver.findElements(this.pinterestShareButton);
        return element.length > 0;
    }

    async isSendToFriendLinkAvailable(): Promise<boolean> {
        const element = await this.driver.findElements(this.sendToFriendButton);
        return element.length > 0;
    }

    async isPrintLinkAvailable(): Promise<boolean> {
        const element = await this.driver.findElements(this.printButton);
        return element.length > 0;
    }

    async getProductQuantity(): Promise<number> {
        const element = await this.driver.findElement(this.productQuantityWanted);
        return parseInt(await element.getAttribute("value"), 10);
    }

    async isProductColorWhiteAvailable(): Promise<boolean> {
        const element = await this.driver.findElements(this.productColorWhite);
        return element.length > 0;
    }

    async isProductColorBlackAvailable(): Promise<boolean> {
        const element = await this.driver.findElements(this.productColorBlack);
        return element.length > 0;
    }

    async getProductPrice(): Promise<string> {
        const element = await this.driver.findElement(this.productPrice);
        return element.getText();
    }

    async getProductSize(): Promise<string> {
        const element = await this.driver.findElement(this.productSize);
        const sizeText = await element.getText();
        return sizeText.charAt(0);
    }

    async isAddToCartButtonAvailable(): Promise<boolean> {
        const element = await this.driver.findElements(this.addToCartButton);
        return element.length > 0;
    }

    async getProductInfo(): Promise<{
        title: string,
        reference: string,
        condition: string,
        description: string,
        availableItemsText: string
    }> {
        const title = await this.getProductTitle();
        const reference = await this.getProductReference();
        const condition = await this.getProductCondition();
        const description = await this.getProductDescription();
        const availableItemsText = await this.getAvailableItems();

        return { title, reference, condition, description, availableItemsText };
    }

    async getProductButtons(): Promise<boolean[]> {
        const buttons = await Promise.all([
            this.isTwitterShareButtonAvailable(),
            this.isFacebookShareButtonAvailable(),
            this.isGooglePlusShareButtonAvailable(),
            this.isPinterestShareButtonAvailable(),

        ]);
        return buttons;
    }

    async getProductLinks(): Promise<boolean[]> {
        const links = await Promise.all([
            this.isPrintLinkAvailable(),
            this.isSendToFriendLinkAvailable(),
        ]);
        return links;
    }

    async getProductBoxInfo(): Promise<[string, number, boolean, string, boolean]> {
        const price = await this.getProductPrice();
        const quantity = await this.getProductQuantity();
        const hasColors = (await this.isProductColorWhiteAvailable()) || (await this.isProductColorBlackAvailable());
        const hasSizes = await this.getProductSize();
        const isAddToCartButtonAvailable = await this.isAddToCartButtonAvailable();

        return [price, quantity, hasColors, hasSizes, isAddToCartButtonAvailable];
    }

    async verifyProductDetails() {
        expect(await this.getProductTitle()).toBe("Blouse");
        expect(await this.getProductReference()).toBe("Reference: demo_2");
        expect(await this.getProductCondition()).toBe("Condition: New product");
        expect(await this.getProductDescription()).toContain("Short sleeved blouse with feminine draped sleeve detail.");
        expect(await this.getAvailableItems()).toBe("5000 Items");
        expect(await this.isTwitterShareButtonAvailable()).toBeTruthy();
        expect(await this.isFacebookShareButtonAvailable()).toBeTruthy();
        expect(await this.isGooglePlusShareButtonAvailable()).toBeTruthy();
        expect(await this.isPinterestShareButtonAvailable()).toBeTruthy();
        expect(await this.isSendToFriendLinkAvailable()).toBeTruthy();
        expect(await this.isPrintLinkAvailable()).toBeTruthy();
        expect(await this.getProductPrice()).toBe("$27");
        expect(await this.getProductQuantity()).toBe(1);
        expect(await this.getProductSize()).toMatch(/\b(S|M|L)\b/i);
        expect(await this.isProductColorWhiteAvailable()).toBeTruthy();
        expect(await this.isProductColorBlackAvailable()).toBeTruthy();
        expect(await this.isAddToCartButtonAvailable()).toBeTruthy();
    }
}