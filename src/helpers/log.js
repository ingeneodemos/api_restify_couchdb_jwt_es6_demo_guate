var winston = require('winston');
var moment = require('moment');
winston.emitErrs = true;

var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: global.config.logLevel,
      filename: global.config.logPath,
      handleExceptions: true,
      json: false,
      maxsize: global.config.logFileSize*1024*1024, //5MB
      maxFiles: global.config.logMaxFiles,
      colorize: false,
      timestamp: function() {
        return new moment().format("YYYY-MM-DD HH:mm:ss.SSS");
      }
    }),

    new winston.transports.Console({
      level: global.config.logLevel,
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: function() {
        return new moment().format("YYYY-MM-DD HH:mm:ss.SSS");
      }
    })
  ],
  exitOnError: false
});

module.exports = logger;
module.exports.stream = {
  write: function(message) {
    logger.log(global.config.logLevel, message);
  }
};