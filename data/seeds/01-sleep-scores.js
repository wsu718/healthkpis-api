exports.seed = function (knex, Promise) {
  return knex('sleep').insert([
    { date: '2019-12-12', seconds: 0, durationHours: 7, durationMinutes: 45, score: 76, bedtime: '22:45' },
    { date: '2019-12-13', seconds: 0, durationHours: 6, durationMinutes: 33, score: 76, bedtime: '22:45' }
  ]);
};

