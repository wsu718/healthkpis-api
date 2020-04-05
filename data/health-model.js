const db = require('./db-config.js');

module.exports = {
    getHealth,
    addHealth,
    getAllHealth,
    getHealthByDay
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

function getHealthByDay(user_id, date) {
    return db('health')
        .where({ user_id })
        .where({ summary_date: date })

}