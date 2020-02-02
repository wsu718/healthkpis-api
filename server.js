const express = require('express');
const helmet = require('helmet');

const SleepRouter = require('./sleep/sleep-router.js');

const server = express();

server.use(helmet());
// server.use(cors());
server.use(express.json());

server.use('/api/sleep', SleepRouter);

server.get('/', (req, res) => {
    res.send('<h1>Hello From HealthKPIs API');
});


module.exports = server;