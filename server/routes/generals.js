const { General, validateGeneral} = require('../models/general');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const general = await General.find();
    res.send(general);
});

router.post('/', async (req, res) => {
    const { error } = validateGeneral(req.body);
    if (error) res.status(500).send("Invalid request")

    let general = new General(req.body);
    general = await general.save();
    res.send(general);
});

router.put('/:id', (req, res) => {
    const { error } = validateGeneral(req.body);
    if (error) res.status(500).send("Invalid request")
    General.findOneAndUpdate(
        {id: req.params.id},
        {$set: { name: req.body.name}},
        {new: true}, 
        (err, result) => {
            if (err) return res.send("Got an error when trying to update: ", err);
            res.send(result);
        }
    );
});

router.delete('/:id', (req, res) => {
    General.findOneAndRemove({ id: req.params.id}, (err, result) => {
        if (err) res.send("cannot remove");
        res.send("successfully removed")
    });
});

module.exports = router;