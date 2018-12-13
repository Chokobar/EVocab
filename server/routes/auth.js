const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validateEmailAndPassword(req.body);
    if (error) return res.status(400).send(error.message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password!');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password!');

    const token = user.generateAuthToken() ;

    res.header('x-auth-token', token).send(token); // move auth-token to config
});

const validateEmailAndPassword = (user) => {
    const schema = {
        email: Joi.string().min(4).max(255).required(),
        password: Joi.string().min(4).max(255).required(),
    }

    return Joi.validate(user, schema);
}

module.exports = router;