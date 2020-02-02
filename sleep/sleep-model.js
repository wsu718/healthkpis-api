const db = require('../data/db-config.js');

module.exports = {
    getSleep,
}

function getSleep() {
    return db('sleep')
};

