const generals = require('../routes/generals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const vocab = require('../routes/vocab');
const error = require('../middleware/error');
const express = require('express');
const cors = require('cors');
const config = require('config');

module.exports = function(app) {
    app.use(express.json());
    app.use(cors({
        exposedHeaders: [config.get('authTokenKey')]
    }));
    app.use('/api/generals', generals);
    app.use('/api/users', users);
    app.use('/api/vocab', vocab);
    app.use('/api/auth', auth);
    app.use(error);
}