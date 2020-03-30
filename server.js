const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const morgan = require('morgan')
const jwtAuthz = require('express-jwt-authz');

const HealthData = require('./data/health-model.js');

// Create a new Express app
const server = express();

server.use(cors());

// Research this and add later
// server.use(cors(
//     {
//         origin: "http://localhost:3000" || "https://www.healthkpis.com", // restrict calls to those this address
//         methods: "GET" // only allow GET requests
//     }
// ));

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

server.get('/', (req, res) => {
    res.send('<h1>Hello From HealthKPIs API');
});

// Needed to add customScopeKey so jwtAuthz would check permissions 
const checkReadScopes = jwtAuthz(['read:sleep'], { customScopeKey: 'permissions' })
const checkAddScopes = jwtAuthz(['add:sleep'], { customScopeKey: 'permissions' })

server.get('/api', checkJwt, checkReadScopes, (req, res) => {
    const user_id = req.user.sub
    console.log(user_id)
    HealthData.getHealth(user_id)
        .then(health => {
            res.status(200).json(health)
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to get sleep scores' });
        })
});

// Remove this eventually, this is just for testing 
server.get('/api/all', checkJwt, checkReadScopes, (req, res) => {
    HealthData.getAllHealth()
        .then(health => {
            res.status(200).json(health)
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to get sleep scores' });
        })
});

server.post('/api', checkJwt, checkAddScopes, (req, res) => {
    HealthData = req.body
    HealthData.user_id = req.user.sub
    HealthData.addHealth(HealthData)
        .then(health => {
            res.status(201).json(health)
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to add sleep score' })
        })
})

module.exports = server;