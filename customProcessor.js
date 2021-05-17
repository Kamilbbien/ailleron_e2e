var DisplayProcessor = require('jasmine-spec-reporter').DisplayProcessor; 

function TimeProcessor(options) {
}

function getTime() {
    var lz = function (arg) { return arg < 10 ? '0' + arg : arg; };
    var now = new Date();
    return lz(now.getHours()) + ':' +
           lz(now.getMinutes()) + ':' +
           lz(now.getSeconds())
}

TimeProcessor.prototype = new DisplayProcessor();

TimeProcessor.prototype.displaySuite = function (suite, log) {
  return getTime() + ' - ' + log;
};

TimeProcessor.prototype.displaySuccessfulSpec = function (spec, log) {
  return getTime() + ' - ' + log;
};

TimeProcessor.prototype.displayFailedSpec = function (spec, log) {
  return getTime() + ' - ' + log;
};

TimeProcessor.prototype.displayPendingSpec = function (spec, log) {
  return getTime() + ' - ' + log;
};


module.exports = TimeProcessor;