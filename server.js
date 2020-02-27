const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const morgan = require('morgan')

const SleepRouter = require('./sleep/sleep-router.js');

// Create a new Express app
const server = express();

server.use(cors(
    {
        origin: "http://localhost:3000", // restrict calls to those this address
        methods: "GET" // only allow GET requests
    }
));

server.use(morgan('combined'))

// Set up Auth0 configuration
const authConfig = {
    domain: "healthkpis.auth0.com",
    audience: "https://api.healthkpis.com"
};

// Define middleware that validates incoming bearer tokens
// using JWKS from healthkpis.auth0.com
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),

    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithm: ["RS256"]
});

// server.use(jwtCheck);

server.get('/api/public', function (req, res) {
    res.json({
        message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
});

// This route needs authentication
server.get('/api/private', checkJwt, function (req, res) {
    res.json({
        message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
});

// Define an endpoint that must be called with an access token
server.get("/api/external", checkJwt, (req, res) => {
    res.send({
        msg: "Your Access Token was successfully validated!"
    });
});

server.use(helmet());

server.use(express.json());

server.use('/api/sleep', checkJwt, SleepRouter);

server.get('/', (req, res) => {
    res.send('<h1>Hello From HealthKPIs API');
});

module.exports = server;