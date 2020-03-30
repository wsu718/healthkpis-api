const db = require('./db-config.js');

module.exports = {
    getHealth,
    addHealth,
    getAllHealth
}

function getHealth(user_id) {
    return db('sleep')
        .where({ user_id })
};

function getAllHealth() {
    return db('sleep')
};

function addHealth(sleep) {
    return db('sleep')
        .insert(sleep)
        .then(id => {
            return id
        })
}

