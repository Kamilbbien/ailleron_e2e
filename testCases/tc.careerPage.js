var ailleronSite = require('../pageObjects/po.utils.js');
var careerPage = require('../pageObjects/po.careerPage.js');
var testData = require('../testData/td.careerPage.js');
const { browser } = require('protractor');

describe('Check Intership options', function () {

    var utils = new ailleronSite.Utils();
    var career = new careerPage.Career();   
    
    it('Go to Ailleron Kariera', async () => {
        await utils.goToPortal();
    });

    it('Check welcome modal', async () => {
        await utils.checkWelcomeWindow(testData.welcomeModal.title, testData.welcomeModal.about);
    });

    it('Check Carrer page - switch language and accept cookies', async () => {
        await utils.switchLanguage();
        await utils.acceptCookie();
    });

    it('Check Carrer page - top bar section', async () => {
        await utils.checkTopBar();
    });

    it('Check Carrer page - front banner section', async () => {
        await career.checkFrontBanner(testData.frontBanner.title, testData.frontBanner.about);
    });

    it('Check Carrer page - find something section', async () => {
        await career.checkFindSomething(testData.findJob.title, testData.findJob.about, testData.findJob.locations, testData.findJob.place, testData.findJob.category);
        await career.findJob(testData.findJob.place, testData.findJob.category);
    });

    it('Check Carrer page - Recruitment flow', async () => {
        await utils.checkRecruimentSection(testData.recruitment.title, testData.recruitment.about);
    });

    it('Check Carrer page - Meet Us section', async () => {
        await career.checkMeetUsSection(testData.meetUs.title, testData.meetUs.about, testData.meetUs.companyDescription, testData.meetUs.links);
    });

    it('Check Carrer page - Ailleron in numbers section', async () => {
        await career.checkNumbersSection(testData.numbers.title, testData.numbers.about);
    });

    it('Check Carrer page - Contact section', async () => {
        await utils.checkContactSection(testData.contact.title, testData.contact.about, testData.contact.data, testData.contact.alert);
    });

    it('Check the footer on the page', async () => {
        await utils.checkFooterSection(testData.footer.title, testData.footer.copyrights);
    });
});