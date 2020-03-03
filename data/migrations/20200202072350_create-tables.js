
exports.up = function (knex) {
    return knex.schema
        .createTable('sleep', tbl => {
            tbl.increments();
            tbl.string('user_id', 128)
                .notNullable();
            tbl.string('summary_date', 128)
                .notNullable();
            tbl.integer('score_total')
                .notNullable();
            tbl.string('bedtime_start')
                .notNullable();
            tbl.integer('duration')
                .notNullable();
            tbl.integer('readiness')
                .notNullable();
            tbl.integer('hrv')
                .notNullable();
            tbl.integer('rhr')
                .notNullable();
            tbl.integer('weight')
                .notNullable();

        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('sleep')
};
