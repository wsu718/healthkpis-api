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

function getWeeks(user_id) {
    return db('health')
        .where({ user_id })
    // .groupBy('week_of_year').as('week')
    // .avg({
    //     'avg_score_total': 'score_total', 'avg_readiness': 'readiness', 'avg_duration': 'duration', 'avg_readiness': 'readiness', 'avg_hrv': 'hrv', 'avg_rhr': 'rhr', 'avg_weight': 'weight'
    // })
    // .select('week_of_year').as('week_of_year')
    // .select('summary_date')
    //do I need .as on there?
}

// function getLeader(date){
//     return db('health')
//     .where({ date })

// }
