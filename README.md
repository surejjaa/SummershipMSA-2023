# SummershipMSA-2023

![logo](https://api.jobfair.ba/static/kompanije/21.png)
# About the website under test

The MSA team need to test the ["My Shop"](http://www.automationpractice.pl/index.php) website. The web application allows users to browse, filter, and purchase products online. The main functionality of the web application is ordering products by adding personal information, adding items to the cart and comparing them. This project contain automated tests for various scenarios.

# Tech Stack and framework setup

To be able to run this project, it is needed to have Visual Studio Code, Typescript, Jest and Selenium installed. <br>

To use the WebDriver with Selenium, it is required to [download](https://chromedriver.chromium.org/downloads) ChromeDriver with the proper version.
Also, install Node.js [here](https://nodejs.org/en/download) <br>

After each Chrome Browser update run this `npm install selenium-webdriver@latest` to update Selenium. 

Framework setup: 
* Run this `npm init –y` in terminal to create a package.json file in order to be able to compile the project. <br>
* To install the dependencies listed in the package.json file run `npm install` <br>
* Run `npm i -D typescript` to install the typescript <br>
* Build the project with `npm run build` <br>
* Configure JEST `npm i -D jest ts-jest @types/jest` <br>
* To be able to use ts-jest as a preprocessor it is needed to create a jest.config.js file run `npx ts-jest config:init`
* In order to run tests you will also need to run `npm install jest-serial-runner --save-dev ` <br>

# Running the project
Write in terminal `npm test thenameofthetest.test.ts` if you want to run specific test <br> 
If you want to run all tests it is needed first to run `npm test registration.test.ts` to create an account and then write `npm test` to run all other tests

# MSA Team Members 

1. Surejja Alibegovic
2. Amila Causevic
3. Zainab Benmokhchane 
