var protractor = require('protractor');
const { element } = require('protractor');
var EC = protractor.ExpectedConditions;
var testUrl = browser.params.testUrl;
var path = require('path');

// Can be used several times in the portal
class Utils {
    constructor () {

        // Welcome modal
        this.welcomeModal = element(by.css('div[class="modal-content modal-content--custom"]'));
        this.welcomeModal_title = this.welcomeModal.$('h2.heading');
        this.welcomeModal_about = this.welcomeModal.$('div.customModal__description');
        this.welcomeModal_goButton = this.welcomeModal.element(by.cssContainingText('button','Go to website'));
        this.welcomeModal_picture = this.welcomeModal.$('img.customModal__img');
        this.welcomeModal_closeButton = $('div[class="customModal__imageContainer d-none d-sm-block"]').$('button[aria-label="Close"]');

        // About cookie info
        this.cookieModal = $('div[id="js-cookie-modal"]');
        this.cookieModal_settingsButton = this.cookieModal.element(by.id('js-cookies-settings'));
        this.cookieModal_agreeButton = this.cookieModal.element(by.id('js-cookie-btn'));

        // Top bar
        this.topBarArea = element(by.css('div.header__container'));
        this.topBarArea_logo = this.topBarArea.$('a.header__logotype-link');
        this.topBarArea_career = this.topBarArea.element(by.id('menu-item-96')).$('span.header-menu__title');
        this.topBarArea_internship = this.topBarArea.element(by.id('menu-item-5691')).$('span.header-menu__title');
        this.topBarArea_meetUp = this.topBarArea.element(by.id('menu-item-5753')).$('span.header-menu__title');
        this.topBarArea_recommendation = this.topBarArea.element(by.id('menu-item-6586')).$('span.header-menu__title');
        this.topBarArea_checkOffers = this.topBarArea.$('a[href="#js-offers"]');
        this.topBarArea_languageEn = this.topBarArea.$('a[lang="en-GB"]');
        this.topBarArea_languagePL = this.topBarArea.$('a[lang="pl-PL"]');
        
        // Recruitment section
        this.recruitmentArea = $('section[class*="process"]');
        this.recruitment_title = this.recruitmentArea.$('h2.paragraph__heading');
        this.recruitment_about = this.recruitmentArea.$('div.paragraph__text');
        this.recruitment_timeline = this.recruitmentArea.$('div.timeline');

        // Contact section
        this.contactArea = $('section.contact');
        this.contactArea_title = this.contactArea.$('h2[class="heading heading--h2 heading--primary"]');
        this.contactArea_about = this.contactArea.$('div.contact-form__text');
        this.contactArea_contactPerson = this.contactArea.$('div.contact-form__person');
        this.contactArea_nameInput = this.contactArea.$('input[name="nameandsurname-contact-pl"]');
        this.contactArea_emailInput = this.contactArea.$('input[name="e-mail-contact-pl"]');
        this.contactArea_phoneInput = this.contactArea.$('input[name="tel-370"]');
        this.contactArea_messageInput = this.contactArea.$('textarea[name="message-contact-pl"]');
        this.contactArea_addCvLink = this.contactArea.$('i.icon-paper-clip');
        this.contactArea_consentCheckbox = this.contactArea.$('span.wpcf7-list-item-label');
        this.contactArea_sendButton = this.contactArea.$('input[type="submit"]');
        this.contactArea_alert = this.contactArea.$('div.wpcf7-response-output'); 

        // Page footer
        this.footerArea = $('footer.footer');
        this.footerArea_title = this.footerArea.$('h2.footer__heading');
        this.footerArea_linksSection = this.footerArea.$('nav.footer-nav');
        this.footerArea_socials = this.footerArea.$('div.social__icons');
        this.footerArea_copyrights = this.footerArea.$('p.copyrights');
        this.footerArea_logo = this.footerArea.$('div.footer-logotype');
    };

    /**
     * Function used to go to the portal
     */
    async goToPortal() {
        browser.driver.ignoreSynchronization = true;
        browser.waitForAngularEnabled(false);
        await browser.driver.get(testUrl);
        await browser.sleep(5000);
        await browser.wait(EC.visibilityOf(this.welcomeModal), 10000, 'Welcome modal is not displayed after 10s.'); 
    };    

    /**
     * Function used to check the welcome modal
     * @param {string} title provide modal title
     * @param {string} about prive modal description
     */
    async checkWelcomeWindow(title, about) {
        expect(await this.welcomeModal_title.getText()).toBe(title, 'The displayed title is incorrect.');
        expect(await this.welcomeModal_about.getText()).toBe(about, 'The displayed description is incorrect.');
        expect(await this.welcomeModal_picture.isDisplayed()).toBe(true, 'Modal photo is not displayed.');
        expect(await this.welcomeModal_closeButton.isDisplayed()).toBe(true, 'Close button is not displayed.');
        await this.welcomeModal_goButton.click();
    };

    /**
     * Function used to switch language
     */
    async switchLanguage(){
        await this.topBarArea_languagePL.click();
        await browser.wait(EC.visibilityOf(this.topBarArea_logo, 10000, 'Top bar is not displayed after 10s.'))
        expect(await this.topBarArea_languageEn.isDisplayed()).toBe(true, 'The language was not changed.');
    };

    /**
     * Function that accept cookies on the site
     */
    async acceptCookie(){
        expect(await this.cookieModal.isDisplayed()).toBe(true, 'Cookie modal is not displayed.');
        await browser.wait(EC.elementToBeClickable(this.cookieModal_settingsButton), 5000, 'Settings button is not clickable in 5s.');
        await browser.wait(EC.elementToBeClickable(this.cookieModal_agreeButton), 5000, 'I agree button is not clickable in 5s.');
        await this.cookieModal_agreeButton.click();
    };

    /**
     * Function that checks Top bar
     */
    async checkTopBar(){
        expect(await this.topBarArea_logo.isDisplayed()).toBe(true, 'Company logo is not displayed.');
        expect(await this.topBarArea_career.isDisplayed()).toBe(true, 'The button to the Career page is not displayed.');
        expect(await this.topBarArea_internship.isDisplayed()).toBe(true, 'The button to the Internship page is not displayed.');
        expect(await this.topBarArea_meetUp.isDisplayed()).toBe(true, 'The button to the Meet us page is not displayed.');
        expect(await this.topBarArea_checkOffers.isDisplayed()).toBe(true, 'The button to the Check offers page is not displayed.');
    };

    /**
     * Scroll to find some element in the view
     * @param {ElementFinder} element the located element of interest
     * @returns {webdriver.promise.Promise} returns a webdriver promise
     */
    async scrollIntoView(elm) {
        await browser.executeScript("arguments[0].scrollIntoView(false)", await elm.getWebElement());
    };

    /**
     * Function that checks current card URL 
     * @param {*} expectedUrl provide card URL 
     */
    async checkCurrentUrl(expectedUrl) {
        expect(await browser.getCurrentUrl()).toContain(expectedUrl, 'Expected url does not match.');
    };
    
    /**
     * Function that switches opened windows
     * @param {*} num provide tab number
     */
    async switchWindow(num) {
        await browser.getAllWindowHandles().then(async (handles) => {
        await browser.switchTo().window(handles[num]);
        });
    };
    
    /**
     * Function that combines switching and checking the current URL
     * @param {*} expectedUrl 
     */
    async switchTabAndCheckUrl(expectedUrl) {
        browser.driver.ignoreSynchronization = true;
        browser.waitForAngularEnabled(false);
        await this.switchWindow(1);
        await browser.sleep(3000);
        await this.checkCurrentUrl(expectedUrl);
        await browser.driver.close();
        await this.switchWindow(0);
    };

    /**
     * Function is used to upload file
     * @param {*} fileName provide file name
     */
    async uploadFile(fileName) {
        var fileToUpload = '../testData/' + fileName;
        var absolutePath = path.resolve(__dirname, fileToUpload);
        await this.contactArea_addCvLink.click();
        await element(by.css('input[type="file"]')).sendKeys(absolutePath);
        await browser.sleep(10000);
    };

    /**
     * Function that checks recruitment section
     * @param {string} place provide selected location 
     * @param {string} category provide choosen job category
     */
    async checkRecruimentSection(title, about){
        await this.scrollIntoView(this.recruitment_title);
        expect(await this.recruitment_title.getText()).toBe(title, 'The displayed title is incorrect.');
        expect(await this.recruitment_about.getText()).toBe(about, 'The displayed description is incorrect.');
        expect(await this.recruitment_timeline.isDisplayed()).toBe(true, 'Recruitment flow is not displayed.');
    };

    /**
     * Function that checks contact section
     * @param {string} place provide selected location 
     * @param {string} category provide choosen job category
     * @param {string} fileName provide name of the selected file
     * @param {string} alert provide an alert after sending the message
     */
    async checkContactSection(title, about, data, alert){
        await this.scrollIntoView(this.contactArea_title);
        expect(await this.contactArea_title.getText()).toBe(title, 'The displayed title is incorrect.');
        expect(await this.contactArea_about.getText()).toBe(about, 'The displayed description is incorrect.');
        expect(await this.contactArea_contactPerson.isDisplayed()).toBe(true, 'Contact person info is not displayed.');
        await this.contactArea_nameInput.sendKeys(data.name);
        await this.contactArea_emailInput.sendKeys(data.email);
        await this.contactArea_phoneInput.sendKeys(data.phone);
        await this.contactArea_messageInput.clear();
        await this.contactArea_messageInput.sendKeys(data.message);        
        expect(await this.contactArea_addCvLink.isDisplayed()).toBe(true, 'Add CV link is not displayed.');
        await this.contactArea_consentCheckbox.click();
        await this.contactArea_sendButton.click();
        await browser.wait(EC.visibilityOf(this.contactArea_alert), 10000, 'Alert is not displayed after 10s.');
        expect(await this.contactArea_alert.getText()).toBe(alert, 'Invalid alert after sending the message.');
    };

    /**
     * Function that checks page footer
     * @param {*} title provide footer section title
     * @param {*} copyrights provide information about the copyright owner
     */
    async checkFooterSection(title, copyrights){
        await this.scrollIntoView(this.footerArea_title);
        expect(await this.footerArea_title.getText()).toBe(title, 'The displayed title is incorrect.');
        expect(await this.footerArea_linksSection.isDisplayed()).toBe(true, 'Links section is not displayed.');
        expect(await this.footerArea_socials.isDisplayed()).toBe(true, 'Social media section is not displayed');
        expect(await this.footerArea_copyrights.getText()).toBe(copyrights, 'Copyrights is not correct.');
        expect(await this.footerArea_logo.isDisplayed()).toBe(true, 'Company logo is not displayed.')
    };
};

module.exports = {
    Utils : Utils,
}