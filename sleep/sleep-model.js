const db = require('../data/db-config.js');

module.exports = {
    getSleep,
    addSleep
}

function getSleep() {
    return db('sleep')
};

function addSleep(sleep) {
    return db('sleep')
        .insert(sleep)
        .then(id => {
            return id
        })
}

