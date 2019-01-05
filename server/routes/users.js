const express = require('express');
const { User, validateRegisterUser } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const config = require('config');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

router.get('/', [auth, admin], async (req, res) => {
    res.send(await User.find());
});

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(_.pick(req.user, '_id')).select('-password');
    res.send(user);
});

router.post('/register', async (req, res) => {
    const { error } = validateRegisterUser(req.body);
    if (error) return res.status(400).send(error.message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered!');

    user = new User(_.pick(req.body, ['username', 'password', 'email', 'isAdmin']));
    user.password = await bcrypt.hash(user.password, 10)
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['username','email'])); // move auth-token to config
});

module.exports = router;