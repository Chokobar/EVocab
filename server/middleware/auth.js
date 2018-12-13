const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
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