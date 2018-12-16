const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
    mongoose.connect(config.get('MongodbConnectionString'), { useNewUrlParser: true })
        .then(() => {
            winston.info('connected to mongodb');
        })
}