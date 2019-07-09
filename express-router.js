const express = require('express');
const router = express.Router();
const Utils = require('./data/db.js');

router.get('/api/posts', async (req, res) => {
    try {
        const utils = await Utils.find();
        res.status(200).json(utils);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "The posts information could not be retrieved."
        });
    }
});

module.exports = router;