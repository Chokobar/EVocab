const mongoose = require('mongoose');
const Joi = require('joi');

const generalSchema = mongoose.Schema({
    id: {
        type: Number,
        require: false
    },
    name: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 25
    }
});

const General = mongoose.model('General', generalSchema);

const validateGeneral = (general) => {
    const schema = {
        id: Joi.number(),
        name: Joi.string().min(5).max(25).required()
    }

    return Joi.validate(general, schema);
};

exports.General = General;
exports.validateGeneral = validateGeneral;