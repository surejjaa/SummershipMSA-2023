# SummershipMSA-2023

![logo](https://api.jobfair.ba/static/kompanije/21.png)
# About the website under test

The MSA team tested the ["My Shop"](http://www.automationpractice.pl/index.php) website. The web application allows users to browse, filter, and purchase products online by adding personal information, adding items to the cart and comparing them. This project contains automated tests for various scenarios.

# Tech Stack and framework setup

To be able to run this project, Visual Studio Code, Typescript, Jest and Selenium need to be installed. <br>

To use the WebDriver with Selenium, it is required to [download](https://chromedriver.chromium.org/downloads) ChromeDriver with the proper version.
Also, install Node.js [here](https://nodejs.org/en/download) <br>

After each Chrome Browser update, run : `npm install selenium-webdriver@latest` to update Selenium. 

Framework setup: 
* Run : `npm init –y` in terminal to create a package.json file, in order to compile the project. <br>
* To install the dependencies listed in the package.json file run : `npm install` <br>
* Run : `npm i -D typescript` to install typescript <br>
* Build the project with : `npm run build` <br>
* Configure JEST : `npm i -D jest ts-jest @types/jest` <br>
* To be able to use ts-jest as a preprocessor, create a jest.config.js file with command : `npx ts-jest config:init`
* In order to run tests, run : `npm install jest-serial-runner --save-dev ` <br>

# Running the project

If you want to run a specific test, run command : `npm test thenameofthetest.test.ts` <br> 
If you want to run all the tests, first run : `npm test registration.test.ts` to create an account and then run other tests with : `npm test`

# MSA Team Members 

1. Surejja Alibegovic
2. Amila Causevic
3. Zainab Benmokhchane 
