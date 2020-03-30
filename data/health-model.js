const db = require('./db-config.js');

module.exports = {
    getHealth,
    addHealth,
    getAllHealth
}

function getHealth(user_id) {
    return db('health')
        .where({ user_id })
};

function getAllHealth() {
    return db('health')
};

function addHealth(health) {
    return db('health')
        .insert(health)
        .then(id => {
            return id
        })
}

