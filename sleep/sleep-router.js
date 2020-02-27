const express = require('express');
const jwtAuthz = require('express-jwt-authz');

const Sleep = require('./sleep-model.js');

const router = express.Router();

// const db = require('../data/db-config.js');

// Needed to add customScopeKey so jwtAuthz would check permissions 
const checkReadScopes = jwtAuthz(['read:sleep'], { customScopeKey: 'permissions' })

router.get('/', checkReadScopes, (req, res) => {
    const user_id = req.user.sub
    Sleep.getSleep(user_id)
        .then(sleep => {
            res.status(200).json(sleep)
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to get sleep scores' });
        })
});

router.get('/all', checkReadScopes, (req, res) => {
    Sleep.getAllSleep()
        .then(sleep => {
            res.status(200).json(sleep)
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to get sleep scores' });
        })
});

router.post('/', (req, res) => {
    const sleepData = req.body;

    Sleep.addSleep(sleepData)
        .then(sleep => {
            res.status(201).json(sleep)
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to add sleep score' })
        })
})

module.exports = router;

