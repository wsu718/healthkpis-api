exports.seed = function (knex, Promise) {
  return knex('health').insert([
    { user_id: 'auth0|5e3d8e29d82dd00e84f9bd52', summary_date: '2019-12-12', score_total: 76, bedtime_start: '22:25', duration: 27945, readiness: 88, hrv: 32, rhr: 49, weight: 191, week_of_year: 50 },
    { user_id: 'auth0|5e3d8e29d82dd00e84f9bd52', summary_date: '2019-12-11', score_total: 73, bedtime_start: '22:25', duration: 26345, readiness: 80, hrv: 27, rhr: 53, weight: 194, week_of_year: 50 },
    { user_id: 'auth0|66977', summary_date: '2019-12-11', score_total: 73, bedtime_start: '22:25', duration: 26345, readiness: 88, hrv: 32, rhr: 49, weight: 191, week_of_year: 50 }
  ]);
};

