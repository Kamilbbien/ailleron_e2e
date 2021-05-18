var portalUtils = require('./po.utils.js');
var utils = new portalUtils.Utils();
var EC = protractor.ExpectedConditions;

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
        this.meetUsArea_firmDescription = this.meetUsArea.$$('div.card__text');
        this.meetUsArea_linkedin = this.meetUsArea.$('span.icon-LinkedIn');
        this.meetUsArea_facebook = this.meetUsArea.$('span.icon-FB');
        this.meetUsArea_instagram = this.meetUsArea.$('span.icon-Instagram');
        this.meetUsArea_youtube = this.meetUsArea.$('span.icon-YT');

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
        await utils.scrollIntoView(this.frontBannerArea_header);
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
        await utils.scrollIntoView(this.findJobArea_header);
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
        await utils.scrollIntoView(this.selectedJobArea_tile);
        expect(await this.selectedJobArea.getText()).toBe(category, 'The selected job category is incorrect.');
        expect(await this.selectedJobArea_tile.isDisplayed()).toBe(true, 'Job offer is not displayed.');
    };

    /**
     * Function that checks Meet us section
     * @param {string} title provide section title
     * @param {string} about provide section decription
     */
    async checkMeetUsSection(title, about, description, link){
        await utils.scrollIntoView(this.meetUsArea_title);
        expect(await this.meetUsArea_title.getText()).toBe(title, 'The displayed title is incorrect.');
        expect(await this.meetUsArea_about.getText()).toBe(about, 'The displayed decription is incorrect.');
        expect(await this.meetUsArea_seeVideosButton.isDisplayed()).toBe(true, 'See videos is not displayed.');
        expect(await this.meetUsArea_firmDescription.getText()).toEqual(description, 'Company description is incorrect.');        
        await this.meetUsArea_linkedin.click();
        await utils.switchTabAndCheckUrl(link.in);
        await this.meetUsArea_facebook.click();
        await utils.switchTabAndCheckUrl(link.fb);
        await this.meetUsArea_instagram.click();
        await utils.switchTabAndCheckUrl(link.ig);
        await this.meetUsArea_youtube.click();
        await utils.switchTabAndCheckUrl(link.yt);
    };

    /**
     * Function that checks Ailleron in numbers section
     * @param {string} title provide section title
     * @param {string} about provide section decription
     */
    async checkNumbersSection(title, about){
        await utils.scrollIntoView(this.numbersArea_title);
        expect(await this.numbersArea_title.getText()).toBe(title, 'The displayed title is incorrect.');
        expect(await this.numbersArea_about.getText()).toBe(about, 'The displayed decription is incorrect.');
        expect(await this.numbersArea_tiles.isDisplayed()).toBe(true, 'Tiles with numbers are not displayed.')
    };

}

module.exports = {
    Career : Career,
}