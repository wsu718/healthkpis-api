exports.seed = function (knex, Promise) {
  return knex('sleep').insert([
    { user_id: 'auth0|5e3d8e29d82dd00e84f9bd52', summary_date: '2019-12-12', score_total: 76, bedtime_start: '2019-12-11T02:13:19+02:00', duration: 27945 },
    { user_id: 'auth0|5e3d8e29d82dd00e84f9bd52', summary_date: '2019-12-11', score_total: 73, bedtime_start: '2019-12-10T02:13:19+02:00', duration: 26345 },
    { user_id: 'auth0|66977', summary_date: '2019-12-11', score_total: 73, bedtime_start: '2019-12-10T02:13:19+02:00', duration: 26345 }
  ]);
};

