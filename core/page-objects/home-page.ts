import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";

export class HomePage extends BasePage {
    private searchBar = By.id("search_query_top");
    private searchButton = By.name("submit_search");
    private dresses = By.xpath('//div[@class="product-container"]//h5//a[@class="product-name"]');
    private search_box = By.id('searchbox');
    private logo = By.className("logo img-responsive");

    constructor(driver: WebDriver) {
        super(driver);
    }
    async navigateToHomePage() {
        await this.driver.findElement(this.logo).click();
    }
    async clickSearchInput(){
        await this.findElementAndClick(this.searchBar);
    }
    async enterSearchingProduct(){
        let searchInputElement = await this.findElement(this.searchBar);
        await searchInputElement.sendKeys("Dress");
        await this.findElementAndClick(this.searchButton);
    }
    async checkSearchedProduct(){
        await this.checkSearchedItems(this.dresses, "Dress");
    }
    async isSearchInputDisplayed(){
        const searchBox: boolean = await this.driver.findElement(this.search_box).isDisplayed();
        expect(searchBox).toBeTruthy();
    } 
}