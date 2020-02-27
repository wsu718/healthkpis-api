const db = require('../data/db-config.js');

module.exports = {
    getSleep,
    addSleep,
    getAllSleep
}

function getSleep(user_id) {
    return db('sleep')
        .where({ user_id })
};

function getAllSleep() {
    return db('sleep')
};

function addSleep(sleep) {
    return db('sleep')
        .insert(sleep)
        .then(id => {
            return id
        })
}

