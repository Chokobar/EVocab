const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
    const token = req.header(config.get('authTokenKey'));
    if (!token) return res.status(401).send('Access denied no token provided');

    try {
        const decode = jwt.verify(token, 'EVocab');
        req.user = decode;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token')
    }
}

module.exports = auth;