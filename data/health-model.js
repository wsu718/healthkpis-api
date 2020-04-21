const db = require('./db-config.js');

module.exports = {
    getHealth,
    addHealth,
    getAllHealth,
    getHealthByDay,
    findById,
    deleteHealth,
    updateHealth
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
        .then(ids => {
            const [id] = ids
            return findById(id)
        })
}

function getHealthByDay(user_id, date) {
    return db('health')
        .where({ user_id })
        .where({ summary_date: date })
}

function findById(id) {
    return db('health')
        .where({ id })
        .first()
}

function deleteHealth(user_id, id) {
    return db('health')
        .where({ user_id })
        .where({ id })
        .del();
}

function updateHealth(user_id, id, health) {
    return db('health')
        .where({ user_id })
        .where({ id })
        .update(health)
        .then(count => count > 0 ? findById(id) : null)
}