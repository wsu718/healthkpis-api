
exports.up = function (knex) {
    return knex.schema
        .createTable('sleep', tbl => {
            tbl.increments();
            tbl.string('user_id', 128)
                .notNullable();
            tbl.string('summary_date', 128)
                .notNullable();
            tbl.integer('score_total')
            tbl.string('bedtime_start')
            tbl.integer('duration')
            tbl.integer('readiness')
            tbl.integer('hrv')
            tbl.integer('rhr')
            tbl.integer('weight')
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('sleep')
};
