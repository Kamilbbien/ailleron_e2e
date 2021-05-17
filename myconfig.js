var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var TimeProcessor = require('./customProcessor');
var path = require('path');
var HtmlReporter = require('protractor-beautiful-reporter');
var fs = require('fs-extra');
var cheerio = require('cheerio');


var getDateFormated = function () {
    var now = new Date();
    var lz = function (arg) { return arg < 10 ? '0' + arg : arg; };
    return now.getFullYear() + '_' + lz(now.getMonth() + 1) + '_' + lz(now.getDate()) + '_' + lz(now.getHours()) + '_' + lz(now.getMinutes());
};

var getddmmyyyyDate = function(){
    var now = new Date();
    var lz = function (arg) { return arg < 10 ? '0' + arg : arg; };
    return lz(now.getDate())+ '/' + lz(now.getMonth() + 1) + '/' + now.getFullYear();
};

var folderName = getDateFormated();

var specReporter = new SpecReporter({
    spec: {
        displayStacktrace: true,
        displayDuration: true,
        showSummary: true,
        showQuickLinks: true,
        inlineImages: true
    },
    customProcessors: [TimeProcessor]
});

exports.config = {
    directConnect: true,
    capabilities: {
        pageLoadStrategy: 'normal',
        browserName: 'chrome',

        chromeOptions: {
            args: [
                '--disable-infobars',
                '--start-maximized',
                '--headless',
                '--disable-features=VizDisplayCompositor',
            ],
            prefs: {
                'profile.password_manager_enabled': false,
                'credentials_enable_service': false,
                'password_manager_enabled': false,
            },
        }
    },

    suites: {
        portal: [
            './testCases/tc.ailleron.js',
        ],
    },

    params: {
        testUrl: 'https://kariera.ailleron.com/en/',
    },

    // Add Jasmine reporters
    onPrepare: () => {
        global.EC = protractor.ExpectedConditions;
        global.currentDate = getddmmyyyyDate();
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'new_Reports/',
            pathBuilder: function pathBuilder(suites, descriptions, results) {
                var validDescriptions = descriptions.map(function (description) {
                    return description.replace('/', '@');
                });
                return path.join(folderName,
                    validDescriptions.join('_'));
            },
            gatherBrowserLogs: true,
            docTitle: 'Ailleron Career - Test results',
            screenshotsSubfolder: 'images'
        }).getJasmine2Reporter());

        jasmine.getEnv().addReporter(specReporter);
    },

    onComplete() {
        const e2eOutputDir = './new_Reports/'+folderName+'/'
        const src = fs.readFileSync(path.join(e2eOutputDir, "report.html")).toString();
        const $ = cheerio.load(src);
    
        if ($('head meta[name="x-ispatched"][content="true"]').length > 0) {
          console.log("is already patched");
        } else {
          $('h2').before('<div class="qa-reports-logo">\n'+'<img src="../../logo.png">'+'</div>');
          $('head').append('<meta name="x-ispatched" content="true">');
          fs.writeFileSync(path.join(e2eOutputDir, "report.html"), $.html(), 'utf8');
        }
    },

    // Set scripts timeout
    allScriptsTimeout: 100000,

    // Jasmine options
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 300000,
        print: function () { }
    }
};