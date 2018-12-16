const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: 4,
        maxlength: 50
    },
    password: {
        type: String,
        require: true,
        minlength: 4,
        maxlength: 255
    },
    email: {
        type: String,
        require: true,
        minlength: 4,
        maxlength: 255,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey')); 
    return token
}

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
    const schema = {
        username: Joi.string().min(4).max(50).required(),
        password: Joi.string().min(4).max(255).required(),
        email: Joi.string().min(4).max(255).required(),
        isAdmin: Joi.boolean()
    }

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;