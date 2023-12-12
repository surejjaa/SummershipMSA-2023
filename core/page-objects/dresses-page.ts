import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class DressesPage extends BasePage {
    private sorting_header = By.id("productsSortForm");
    private sorting_option = By.id("selectProductSort");
    private choose_option_1 = By.xpath('//select[@id="selectProductSort"]/option[@value="price:asc"]');
    private dress = By.xpath('//div[@class="product-image-container"]//a[@title="Printed Chiffon Dress"]');
    private quick_view = By.xpath('//div[@class="product-image-container"]//a[@class="quick-view"]');
    private closeButton = By.className("fancybox-item fancybox-close");
    private prices = By.xpath("//div[@class='content_price']/span[@class='price product-price']");
    private navigateToDressesButton = By.xpath("//a[@title = 'Dresses']"); 
    private priceRange = By.xpath("//div[9]/div[@class='layered_subtitle_heading']/span");
    private styleCategory = By.xpath("//div[7]/div[@class='layered_subtitle_heading']/span");
    private compositionsCategory = By.xpath("//div[6]/div[@class='layered_subtitle_heading']/span");
    private sliderLocator = By.id("layered_price_slider");
    private sliderHandleLeft = By.xpath("//a[@class='ui-slider-handle ui-state-default ui-corner-all'][1]");
    private sliderHandleRight = By.xpath("//a[@class='ui-slider-handle ui-state-default ui-corner-all'][2]");
    private showingitems = By.className("product-count");
    private styleCheckbox = By.id("layered_id_feature_13");
    private compositionCheckbox = By.id("layered_id_feature_5");
    private elementPrices = By.css(".price.product-price");
    private view = By.className("display-title");
    private listButton = By.id("list");
    private compareDress = By.xpath('//div[@class="compare"]//a[@data-id-product="4"]');
    private productContainer = By.xpath('//div[@class="product-image-container"]');
    private categoryFilter = By.xpath('//input[@id="layered_category_11"]');
    private sizeFilter = By.xpath('//input[@id="layered_id_attribute_group_2"]');
    private colorFilter = By.xpath('//input[@id="layered_id_attribute_group_13"]');
    private availabilityFilter = By.xpath('//input[@id="layered_quantity_1"]');
    private loadingImg = By.xpath('//ul[@class="product_list grid row"]/p');
    private enabledFiltersList = By.xpath('//div[@id="enabled_filters"]/ul/li');
    private allPrices: string[]  = [];

    constructor(driver: WebDriver) {
        super(driver);
    }

    async navigateToDressesPage() {
        const navigation = await this.driver.findElements(this.navigateToDressesButton);
        await navigation[1].click();
    }

    async chooseSortingOption() {
        await this.driver.findElement(this.sorting_option).click();
        const choose = await this.driver.wait(until.elementLocated(this.choose_option_1), 20000);
        await this.scrollToElement(choose);
        await choose.click();
    }
    async checkSortBySection() {
        this.isMatching(this.sorting_header, testData.headers.sort);
    }
    async isSortBySectionDisplayed() {
        const sort: boolean = await this.driver.findElement(this.sorting_header).isDisplayed();
        expect(sort).toBeTruthy();
    }
    async selectQuickView() {
        const chosen_dress = await this.driver.wait(until.elementLocated(this.dress), 10000);
        await this.scrollToElement(chosen_dress);
        await this.hoverElement(chosen_dress);
        await this.driver.findElement(this.quick_view).click();
        const button = await this.driver.wait(until.elementLocated(this.closeButton), 10000);
        await button.click();
    }
    async checkSortFromTheLowestPrice() {
        const checkHeader = await this.driver.findElement(this.sorting_header);
        await this.scrollToElement(checkHeader);
        const currentURL = await this.driver.getCurrentUrl();
        await expect(currentURL).toContain(testData.url.sort_url);
        await this.checkPriceOfTheFirstElement();
    }
    async sortingProductsFromTheLowestPriceFirst() {
        await this.chooseSortingOption();
        await this.selectQuickView();
    }
    async checkPriceOfTheFirstElement() {
        const productPrice = await this.driver.wait(until.elementsLocated(this.prices), 100000);
        let priceText;
        const first = '$16';
        for (let i = 0; i < productPrice.length; i++) {
            if (i === 1) {
                priceText = await productPrice[i].getText();
                expect(first).toEqual(priceText);
            }
        }
    }

    async checkListView() {
        await this.isMatching(this.view, testData.headers.view);
        await this.driver.findElement(this.listButton).isSelected();
    }
    async clickOnListViewButton() {
        await this.findElementAndClick(this.listButton);
        await this.checkListView();
    }

    async addDressToCompare() {
        await this.findElementAndClick(this.compareDress);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    async checkFilter(expectedCount) {
        await this.checkProductQuantity(this.productContainer, expectedCount);
    }

    async addFiltersFromDifferentSections() {
        const filterSections = [
            { filter: this.categoryFilter, key: 'category_number' },
            { filter: this.sizeFilter, key: 'size_number' },
            { filter: this.colorFilter, key: 'color_number' },
            { filter: this.availabilityFilter, key: 'availability_number' },
        ];

        for (const section of filterSections) {
            const filter = section.filter;
            const filterNumberKey = section.key;

            await this.applyFilter(filter);
            const expectedCount = testData.filters[filterNumberKey];
            console.log("Expected count: " + expectedCount)
            const loadingImage = await this.waitForElement(this.loadingImg, 10000);
            if (loadingImage) {
                // Wait until the loader disappears
                await this.scrollToElement(loadingImage);
                await this.driver.wait(until.stalenessOf(loadingImage), 100000);
            }
            await this.checkFilter(expectedCount);
        }
    }
    async checkEnabledFilters() {
        let checkList = await this.driver.findElements(this.enabledFiltersList);
        let elements = [
            testData.filters.category,
            testData.filters.availability,
            testData.filters.size,
            testData.filters.color
        ];

        for (let i = 0; i < checkList.length; i++) {
            let elementText = await checkList[i].getText();
            expect(elementText).toContain(elements[i]);
        }
    }

    async excludeDollarSign(replaceValue : string) {
        const regex = /[$,]/g;
        const result = replaceValue.replace(regex, '');
        return result;
    }

    async storeTrimmedPrices(priceElements, newArray){
        for (const element of priceElements) {
            const prices = await element.getText();
            const trimmedPrices = prices.trim();
            if (trimmedPrices !== "") {
                const modifiedPrices  = await this.excludeDollarSign(trimmedPrices);
                newArray.push(modifiedPrices);
            }
        }
    }

    async storeAllDresses(){
        const priceElements = await this.driver.wait(until.elementsLocated(this.elementPrices),10000);
        await this.storeTrimmedPrices(priceElements, this.allPrices);
        return (this.allPrices);
    }

    async findPriceRangeSection(){
        await this.driver.wait(until.elementLocated(this.priceRange),10000);
        await this.isMatching(this.priceRange, testData.headers.price_range);
    }

    async moveSlider(targetPercentage, sideNumber, sliderHandle){
        const slider = await this.driver.wait(until.elementLocated(this.sliderLocator),10000);
        const sliderSize = await slider.getRect();
        const targetPosition = Math.round((targetPercentage / 100) * sliderSize.width * sideNumber);
        await this.driver.actions().dragAndDrop(sliderHandle, { x: targetPosition, y: 0 }).perform();
    }

    async changePriceRange(){
        const slider = await this.driver.wait(until.elementLocated(this.sliderLocator),10000);
        await this.scrollToElement(slider);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const leftSlider = await this.driver.wait(until.elementLocated(this.sliderHandleLeft),10000);
        const rightSlider = await this.driver.wait(until.elementLocated(this.sliderHandleRight),10000);
        await this.moveSlider(testData.price.left_slide, 1, leftSlider);
        await this.moveSlider(testData.price.right_slide, (-1), rightSlider);
        const displayingItems = await this.driver.wait(until.elementLocated(this.showingitems),10000);
        await this.scrollToElement(displayingItems);
        await new Promise((resolve) => setTimeout(resolve, 3000));
    }

    async checkNumberOfShowingItems(item){
        await this.driver.wait(until.elementLocated(this.showingitems),10000);
        await this.isMatching(this.showingitems, item);
    }

    async applyFilters(){
        await this.driver.wait(until.elementLocated(this.styleCategory),10000);
        await this.isMatching(this.styleCategory, testData.price.style_category);
        await this.driver.wait(until.elementLocated(this.styleCheckbox),10000).click();
        await this.driver.wait(until.elementLocated(this.compositionsCategory),10000);
        await this.isMatching(this.compositionsCategory, testData.price.compositions_category);
        await this.driver.wait(until.elementLocated(this.compositionCheckbox),10000).click();
        await new Promise((resolve) => setTimeout(resolve, 3000));
    }

    async checkFilteredPrices(){
        const newPriceElements = await this.driver.wait(until.elementsLocated(this.elementPrices),10000);
        let filteredPrices : string [] = [];
        await this.storeTrimmedPrices(newPriceElements, filteredPrices);
        for (let price = 0; price<newPriceElements.length; price++){
            let exactElement = parseInt(filteredPrices[price]);
            if(filteredPrices[price]===(this.allPrices[price])) {
                if (exactElement>=25 && exactElement<=40) {
                    return true;
                }
           }
        }
    }
}