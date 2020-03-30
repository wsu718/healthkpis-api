exports.up = function (knex) {
    return knex.schema
        .renameTable('sleep', 'health')
};

exports.down = function (knex) {
    return knex.schema
        .renameTable('health', 'sleep')
};
