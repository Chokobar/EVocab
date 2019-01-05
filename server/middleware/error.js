const winston = require('winston');

module.exports = function (err, req, res, next) {
    winston.error(err.message, err);
    
    console.log('This is from error middleware', err.message);
    // error
    // warn
    // info 
    // verbose
    // debug
    // silly

    // log the exception
    res.status(500).send('Something failed.');
};