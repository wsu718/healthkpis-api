module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/healthkpis',
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    useNullAsDefault: true
  },

  // development: {
  //   client: 'sqlite3',
  //   useNullAsDefault: true, // needed for sqlite
  //   connection: {
  //     filename: './data/database.db3',
  //   },
  //   migrations: {
  //     directory: './data/migrations'
  //   },
  //   seeds: {
  //     directory: './data/seeds'
  //   },
  //   pool: {
  //     afterCreate: (conn, done) => {
  //       conn.run('PRAGMA foreign_keys = ON', done);
  //     }
  //   },
  // },

  // test: {
  //   client: 'sqlite3',
  //   useNullAsDefault: true, // needed for sqlite
  //   connection: {
  //     filename: './data/test.db3',
  //   },
  //   migrations: {
  //     directory: './data/migrations'
  //   },
  //   seeds: {
  //     directory: './data/seeds'
  //   },
  // },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
  }
}