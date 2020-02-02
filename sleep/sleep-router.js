const express = require('express');

const Sleep = require('./sleep-model.js');

const router = express.Router();

// const db = require('../data/db-config.js');

router.get('/', (req, res) => {
    Sleep.getSleep()
        .then(sleep => {
            res.json(sleep)
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to get sleep scores' });
        })
});

module.exports = router;

