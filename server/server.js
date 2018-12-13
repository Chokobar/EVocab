const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const generals = require('./routes/generals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const config = require('config');

const app = express();

if (!config.get('jwtPrivateKey')) {
    console.log("FATAL ERROR: jwtPrivateKey");
    process.exit(1);
}

mongoose.connect('mongodb://jay:j8418232982@ds131784.mlab.com:31784/practicedb', { useNewUrlParser: true })
    .then(() => console.log('connected to mongodb'))
    .catch((err) => console.log('cannot connect to mongo', err));

app.use(express.json());
app.use('/api/generals', generals);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3002
app.listen(3002, () => {
    console.log(`connected to server listening on port ${port}`);
});