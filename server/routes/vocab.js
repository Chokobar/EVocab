const express = require('express');
const { User } = require('../models/user');
const auth = require('../middleware/auth');
const _ = require('lodash');
const router = express.Router();

// normal get first vocab
router.get('/getVocab', auth, async(req, res) => {
    const { vocab } = await getUserVocab(req);
    res.status(200).send(vocab.length === 0 ? [] : vocab[0]);
});

// example request 
// {
// 	    "vocab": { "checking": "test1" }
// }
router.post('/addVocab', auth, async(req, res) => {
    const { _id, vocab } = await getUserVocab(req);
    User.findOneAndUpdate(
        {_id: _id},
        {$push: { vocab: req.body.vocab}},
        (err, result) => {
            if (err) return res.send("Got an error when trying to update adding vocab: ", err);
            res.status(200).send(_.pick(result, "vocab"));
        }
    );
});

// take fist vocab to the last one
router.post('/vocabIsTooEasy', auth, async(req, res) => {
    const { _id, vocab } = await getUserVocab(req);
    const firstItem = vocab.shift();
    deleteFirstElement(_id, firstItem);

    User.findOneAndUpdate(
        {_id: _id},
        {$push: { 
            vocab: firstItem
        }},
        (err, result) => {
            if (err) return res.send("Got an error when trying to update too easy vocab: ", err);
            res.status(200).send(_.pick(result, "vocab"));
        }
    );
});

// take fist vocab to the third one
router.post('/vocabIsTooHard', auth, async(req, res) => {
    const { _id, vocab } = await getUserVocab(req);
    const firstItem = vocab.shift();
    const updatingPosition = vocab.length >= 2 ? 2 : vocab.length;
    deleteFirstElement(_id, firstItem);

    User.findOneAndUpdate(
        {_id: _id},
        {$push: { 
            vocab: {
                $each: [firstItem],
                $position: updatingPosition
        }}},
        (err, result) => {
            if (err) return res.send("Got an error when trying to update too hard vocab: ", err);
            res.status(200).send(_.pick(result, "vocab"));
        }
    );
});

// move to successThisVocab
router.post('/successThisVocab', auth, async(req, res) => {
    const { _id, vocab } = await getUserVocab(req);
    const firstItem = vocab.shift();
    deleteFirstElement(_id, firstItem);
    
    User.findOneAndUpdate(
        {_id: _id},
        {$push: {
            successedVocab: firstItem
        }},
        (err, result) => {
            if (err) return res.send("Got an error when trying to success vocab: ", err);
            res.status(200).send(_.pick(result, "successedVocab"));
        }
    );
});

// get successedVocab
router.get('/getSuccessedVocab', auth, async(req, res) => {
    const successedVocab = await User.findById(_.pick(req.user, '_id')).select('successedVocab');
    res.status(200).send(successedVocab);
});

// delete Vocab
router.delete('/deleteVocab', auth, async(req, res) => {
    const { _id, vocab } = await getUserVocab(req);
    const firstItem = vocab.shift();
    deleteFirstElement(_id, firstItem);
    res.status(200).send("Successfully delete");
});

const getUserVocab = async(req) => {
    const vocabList = await User.findById(_.pick(req.user, '_id')).select('vocab');
    return vocabList;
};

const deleteFirstElement = (id, item) => {
    User.updateOne(
        {_id: id},
        {$pull: { vocab: item}},
        (err, result) => {
            if (err) return res.send("Got an error when trying to delete first vocab: ", err);
        }
    );
};

module.exports = router;
