const express = require('express');
const helmet = require('helmet');

const SleepRouter = require('./sleep/sleep-router.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/sleep', SleepRouter);

module.exports = server;