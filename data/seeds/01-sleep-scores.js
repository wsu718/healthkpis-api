exports.seed = function (knex, Promise) {
  return knex('sleep').insert([
    { summary_date: '2019-12-12', score_total: 76, bedtime_start: '2019-12-11T02:13:19+02:00', duration: 27945 },
    { summary_date: '2019-12-11', score_total: 73, bedtime_start: '2019-12-10T02:13:19+02:00', duration: 26345 }
  ]);
};

