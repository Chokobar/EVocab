const winston = require('winston');
require('winston-mongodb');
const config = require('config');
require('express-async-errors');

module.exports = function() {
    // use winston handleException instead
    // process.on('uncaughtException', (err) => {
    //     winston.error(err.message, err);
    //     process.exit(1);
    // });

    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true}),
        new winston.transports.File({filename: 'uncaughtException.log'})
    );

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    // winston need to be ver- 2.4.0, winston-mongodb ver- 3.0.0
    winston.add(winston.transports.File, { filename: `logfile.log`}); 
    winston.add(winston.transports.MongoDB, { db: config.get('MongodbConnectionString')})
}