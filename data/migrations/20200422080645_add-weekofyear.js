
exports.up = function (knex) {
    return knex.schema
        .table('health', tbl => {
            tbl.integer('week_of_year')
        })
};

exports.down = function (knex) {
    return knex.schema
        .table('health', tbl => {
            tbl.dropColumn('week_of_year')
        })
};
