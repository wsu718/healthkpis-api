
exports.up = function (knex) {
    return knex.schema
        .createTable('sleep', tbl => {
            tbl.increments();
            tbl.string('summary_date', 128)
                .notNullable();
            tbl.integer('score_total')
                .notNullable();
            tbl.string('bedtime_start')
                .notNullable();
            tbl.integer('duration')
                .notNullable();
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('sleep')
};
