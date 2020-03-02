const express = require('express');
const jwtAuthz = require('express-jwt-authz');

const Sleep = require('./sleep-model.js');

const router = express.Router();

// const db = require('../data/db-config.js');

// Needed to add customScopeKey so jwtAuthz would check permissions 
const checkReadScopes = jwtAuthz(['read:sleep'], { customScopeKey: 'permissions' })
const checkAddScopes = jwtAuthz(['add:sleep'], { customScopeKey: 'permissions' })

router.get('/', checkReadScopes, (req, res) => {
    const user_id = req.user.sub
    console.log(user_id)
    Sleep.getSleep(user_id)
        .then(sleep => {
            res.status(200).json(sleep)
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to get sleep scores' });
        })
});

// need to remove this eventually, this is just for testing 
router.get('/all', checkReadScopes, (req, res) => {
    Sleep.getAllSleep()
        .then(sleep => {
            res.status(200).json(sleep)
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to get sleep scores' });
        })
});

router.post('/', checkAddScopes, (req, res) => {
    sleepData = req.body
    sleepData.user_id = req.user.sub
    Sleep.addSleep(sleepData)
        .then(sleep => {
            res.status(201).json(sleep)
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to add sleep score' })
        })
})

module.exports = router;

