
exports.up = function (knex) {
    return knex.schema
        .createTable('sleep', tbl => {
            tbl.increments();
            tbl.string('date', 128)
                .notNullable();
            tbl.integer('seconds')
                .notNullable();
            tbl.integer('durationHours')
                .notNullable();
            tbl.integer('durationMinutes')
                .notNullable();
            tbl.integer('score')
                .notNullable();
            tbl.string('bedtime')
                .notNullable();
        })

};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('sleep')
};
