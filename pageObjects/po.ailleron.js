var protractor = require('protractor');
var EC = protractor.ExpectedConditions;
var testUrl = browser.params.testUrl;

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
        this.contactArea_sendButton = $('input[type="submit"]');
        this.contactArea_alert = $('div.wpcf7-response-output'); 
    };

    /**
     * Function used to go to the portal
     */
    async goToPortal() {
        browser.driver.ignoreSynchronization = true;
        browser.waitForAngularEnabled(false);
        await browser.driver.get(testUrl);
        browser.sleep(5000);
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

    async switchLanguage(){
        await this.topBarArea_languagePL.click();
        await browser.wait(EC.visibilityOf(this.topBarArea_logo, 10000, 'Top bar is not displayed after 10s.'))
        expect(await this.topBarArea_languageEn.isDisplayed()).toBe(true, 'The language was not changed.');
    };

    async acceptCookie(){
        expect(await this.cookieModal.isDisplayed()).toBe(true, 'Cookie modal is not displayed.');
        await browser.wait(EC.elementToBeClickable(this.cookieModal_settingsButton), 5000, 'Settings button is not clickable in 5s.');
        await browser.wait(EC.elementToBeClickable(this.cookieModal_agreeButton), 5000, 'I agree button is not clickable in 5s.');
        await this.cookieModal_agreeButton.click();
    }

    async checkTopBar(){
        expect(await this.topBarArea_logo.isDisplayed()).toBe(true, 'Company logo is not displayed.');
        expect(await this.topBarArea_career.isDisplayed()).toBe(true, 'The button to the Career page is not displayed.');
        expect(await this.topBarArea_internship.isDisplayed()).toBe(true, 'The button to the Internship page is not displayed.');
        expect(await this.topBarArea_meetUp.isDisplayed()).toBe(true, 'The button to the Meet us page is not displayed.');
        expect(await this.topBarArea_checkOffers.isDisplayed()).toBe(true, 'The button to the Check offers page is not displayed.');
    };

    /**
     * Function that checks recruitment section
     * @param {string} place provide selected location 
     * @param {string} category provide choosen job category
     */
    async checkRecruimentSection(title, about){
        await browser.executeScript("arguments[0].scrollIntoView(false)", await this.recruitment_title.getWebElement());
        expect(await this.recruitment_title.getText()).toBe(title, 'The displayed title is incorrect.');
        expect(await this.recruitment_about.getText()).toBe(about, 'The displayed description is incorrect.');
        expect(await this.recruitment_timeline.isDisplayed()).toBe(true, 'Recruitment flow is not displayed.');
    };

    /**
     * Function that checks contact section
     * @param {string} place provide selected location 
     * @param {string} category provide choosen job category
     */
    async checkContactSection(title, about){
        await browser.executeScript("arguments[0].scrollIntoView(false)", await this.contactArea_title.getWebElement());
        expect(await this.contactArea_title.getText()).toBe(title, 'The displayed title is incorrect.');
        expect(await this.contactArea_about.getText()).toBe(about, 'The displayed description is incorrect.');
        expect(await this.contactArea_contactPerson.isDisplayed()).toBe(true, 'Contact person info is not displayed.');
        expect(await this.contactArea_nameInput.isDisplayed()).toBe(true, 'Name input field is not displayed.');
        expect(await this.contactArea_emailInput.isDisplayed()).toBe(true, 'Email input field is not displayed.');
        expect(await this.contactArea_phoneInput.isDisplayed()).toBe(true, 'Phone input field is not displayed.');
        expect(await this.contactArea_messageInput.isDisplayed()).toBe(true, 'Message input field is not displayed.');
        expect(await this.contactArea_addCvLink.isDisplayed()).toBe(true, 'Add CV link is not displayed.');
        expect(await this.contactArea_consentCheckbox.isDisplayed()).toBe(true, 'Checkbox with consent is not displayed.');
        await browser.wait(EC.elementToBeClickable(this.contactArea_sendButton), 5000, 'Send button is not clickable in 5s.');
    };
};

class Career {
    constructor() {

        // Front banner section
        this.frontBannerArea = $('section[class="hero hero--bgFrontPage lazyloaded"]');
        this.frontBannerArea_header = this.frontBannerArea.$('h1.heading');
        this.frontBannerArea_about = this.frontBannerArea.$('div.hero__text');
        this.frontBannerArea_playButton = this.frontBannerArea.$('i.playBtn__icon');
        this.frontBannerArea_checkOffersButton = $('div.hero__contentInner').$('a[href="#js-offers"]');

        // Find something section
        this.findJobArea = $('section[class="jobOffers sectionSpacer"]');
        this.findJobArea_header = this.findJobArea.$('h2.paragraph__heading');
        this.findJobArea_about = this.findJobArea.$('div.paragraph__text');
        this.findJobArea_search = this.findJobArea.$('input[type="search"]');
        this.findJobArea_locations = this.findJobArea.$('button.dropdown-toggle--location');
        this.findJobArea_locationsList = this.findJobArea.$('div[class*="dropdown-menu--location"]');
        this.findJobArea_jobCategories = this.findJobArea.$$('label.categoryBtn');

        this.selectedJobArea = this.findJobArea.$('div.offersCategory').$('h3.offers__heading');
        this.selectedJobArea_tile = this.findJobArea.$('div.col-sm-6');

        // Meet us section
        this.meetUsArea = $('section[class*="socialMedia"]');
        this.meetUsArea_title = this.meetUsArea.$('h2.paragraph__heading');
        this.meetUsArea_about = this.meetUsArea.$('div.paragraph__text');
        this.meetUsArea_seeVideosButton = this.meetUsArea.$('a.btn--senary');
        this.meetUsArea_linkedin = this.meetUsArea.$('span.icon-LinkedIn');
        this.meetUsArea_facebook = this.meetUsArea.$('span.icon-FB');
        this.meetUsArea_instagram = this.meetUsArea.$('span.icon-Instagram');
        this.meetUsArea_youtube = this.meetUsArea.$('span.icon-YT');
        this.meetUsArea_videoPoster = this.meetUsArea.$('img[src="https://kariera.ailleron.com/wp-content/uploads/2020/10/Grzesiek-home.png"]');

        // Ailleron in numbers
        this.numbersArea = $('section[class*="statistics"]');
        this.numbersArea_title = this.numbersArea.$('h2.paragraph__heading');
        this.numbersArea_about = this.numbersArea.$('div.paragraph__text');
        this.numbersArea_tiles = this.numbersArea.$('div[id="js-statistics-carousel"]');
    };

    /**
     * Function that checks the front banner
     */
    async checkFrontBanner(title, about){
        expect(await this.frontBannerArea.isDisplayed()).toBe(true, 'Front banner on Career page is not displayed.');
        await browser.executeScript("arguments[0].scrollIntoView(false)", await this.frontBannerArea_header.getWebElement());
        expect(await this.frontBannerArea_header.getText()).toBe(title, 'The displayed title is incorrect.');
        expect(await this.frontBannerArea_about.getText()).toContain(about, 'The displayed description is incorrect.');
        await browser.wait(EC.elementToBeClickable(this.frontBannerArea_playButton), 5000, 'Play button is not clickable in 5s.');
        await browser.wait(EC.elementToBeClickable(this.frontBannerArea_checkOffersButton), 5000, 'Check offers is not clickable in 5s.');
    };

    /**
     * Function that checks the job search section
     * @param {string} title provide section title
     * @param {string} about provide section decription
     * @param {string} locations provide available locations
     */
    async checkFindSomething(title, about, locations){
        await browser.executeScript("arguments[0].scrollIntoView(false)", await this.findJobArea_header.getWebElement());
        expect(await this.findJobArea_header.getText()).toBe(title, 'The displayed title is incorrect.');
        expect(await this.findJobArea_about.getText()).toContain(about, 'The displayed decription is incorrect.');
        expect(await this.findJobArea_search.isDisplayed()).toBe(true, 'Search input field is not displayed.');
        expect(await this.findJobArea_locations.isDisplayed()).toBe(true, 'Locations dropdown is not displayed.');
        await this.findJobArea_locations.click();
        expect(await this.findJobArea_locationsList.getText()).toEqual(locations, 'Locations are incorrect.');
    };

    /**
     * Function for finding a job
     * @param {string} place provide selected location 
     * @param {string} category provide choosen job category
     */
    async findJob(place, category){
        let location = this.findJobArea_locationsList.element(by.cssContainingText('button', place)).getText();
        await this.findJobArea_search.sendKeys(category);
        await location.click();
        await browser.executeScript("arguments[0].scrollIntoView(false)", await this.selectedJobArea_tile.getWebElement());
        expect(await this.selectedJobArea.getText()).toBe(category, 'The selected job category is incorrect.');
        expect(await this.selectedJobArea_tile.isDisplayed()).toBe(true, 'Job offer is not displayed.');
    };

    /**
     * Function that checks Meet us section
     * @param {string} title provide section title
     * @param {string} about provide section decription
     */
    async checkMeetUsSection(title, about){
        await browser.executeScript("arguments[0].scrollIntoView(false)", await this.meetUsArea_title.getWebElement());
        expect(await this.meetUsArea_title.getText()).toBe(title, 'The displayed title is incorrect.');
        expect(await this.meetUsArea_about.getText()).toBe(about, 'The displayed decription is incorrect.');
        expect(await this.meetUsArea_videoPoster.isDisplayed()).toBe(true, 'Video poster is not displayed.');
        expect(await this.meetUsArea_seeVideosButton.isDisplayed()).toBe(true, 'See videos is not displayed.');
        await browser.wait(EC.elementToBeClickable(this.meetUsArea_linkedin), 5000, 'LinkedIn button is not clickable in 5s.');
        await browser.wait(EC.elementToBeClickable(this.meetUsArea_facebook), 5000, 'Facebook button is not clickable in 5s.');
        await browser.wait(EC.elementToBeClickable(this.meetUsArea_instagram), 5000, 'Instagram button is not clickable in 5s.');
        await browser.wait(EC.elementToBeClickable(this.meetUsArea_youtube), 5000, 'Youtube button is not clickable in 5s.');
    };

    /**
     * Function that checks Ailleron in numbers section
     * @param {string} title provide section title
     * @param {string} about provide section decription
     */
    async checkNumbersSection(title, about) {
        await browser.executeScript("arguments[0].scrollIntoView(false)", await this.numbersArea_title.getWebElement());
        expect(await this.numbersArea_title.getText()).toBe(title, 'The displayed title is incorrect.');
        expect(await this.numbersArea_about.getText()).toBe(about, 'The displayed decription is incorrect.');
        expect(await this.numbersArea_tiles.isDisplayed()).toBe(true, 'Tiles with numbers are not displayed.')
    };
}

module.exports = {
    Utils : Utils,
    Career : Career,
}