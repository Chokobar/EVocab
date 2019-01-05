const express = require('express');
const { User } = require('../models/user');
const auth = require('../middleware/auth');
const _ = require('lodash');
const router = express.Router();

router.get('/getVocab', auth, async(req, res) => {
    const { vocab } = await getUserVocab(req);
    res.status(200).send(vocab.length === 0 ? [] : vocab[0]);
});


// example request 
// {
// 	    "vocab": { "checking": "test1" }
// }
router.put('/addVocab', auth, async(req, res) => {
    const { _id, vocab } = await getUserVocab(req);
    User.findOneAndUpdate(
        {_id: _id},
        {$push: { vocab: req.body.vocab}},
        (err, result) => {
            if (err) return res.send("Got an error when trying to update: ", err);
            res.status(200).send(_.pick(result, "vocab"));
        }
    );
});

router.post('/vocabIsTooHard', async(req, res) => {

});

router.post('/vocabIsTooEasy', async(req, res) => {

});

const getUserVocab = async(req) => {
    const vocabList = await User.findById(_.pick(req.user, '_id')).select('vocab');
    return vocabList;
};

module.exports = router;