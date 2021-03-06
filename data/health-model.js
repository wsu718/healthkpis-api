const db = require('./db-config.js');

module.exports = {
    getHealth,
    addHealth,
    getAllHealth,
    getHealthByDay,
    findById,
    deleteHealth,
    updateHealth,
    getWeeks
}

function getHealth(user_id) {
    return db('health')
        .where({ user_id })
};

function getAllHealth() {
    return db('health')
};

function addHealth(health) {
    console.log(health)
    return db('health')
        .insert(health, 'id')
        .then(([id]) => {
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

function getWeeks(user_id) {
    return db('health')
        .where({ user_id })
        .select('week_of_year')
        .groupBy('week_of_year')
        .avg({
            'avg_score_total': 'score_total', 'avg_readiness': 'readiness', 'avg_duration': 'duration', 'avg_readiness': 'readiness', 'avg_hrv': 'hrv', 'avg_rhr': 'rhr', 'avg_weight': 'weight'
        })
    // Need to add year as well

}

