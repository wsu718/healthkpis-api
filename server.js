const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const morgan = require('morgan')
const jwtAuthz = require('express-jwt-authz');

const healthData = require('./data/health-model.js');

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
    // data.duration = durationHours + durationMinutes;
    const user_id = req.user.sub
    console.log(user_id)
    healthData.getHealth(user_id)
        .then(health => {
            res.status(200).json(health)
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to get sleep scores' });
        })
});

server.get('/api/:date', checkJwt, checkReadScopes, (req, res) => {
    const user_id = req.user.sub;
    const { date } = req.params;
    healthData.getHealthByDay(user_id, date)
        .then(healthDay => {
            res.status(200).json(healthDay)
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to find health data.' })
        })
});

server.delete('/api/:id', checkJwt, checkAddScopes, (req, res) => {
    const user_id = req.user.sub;
    const { id } = req.params
    healthData.deleteHealth(user_id, id)
        .then(id => {
            res.status(200).json({ message: 'The health record has been deleted.' })
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to find health data to delete.' })
        })
});

// Remove this eventually, this is just for testing 
server.get('/api/all', checkJwt, checkReadScopes, (req, res) => {
    healthData.getAllHealth()
        .then(health => {
            res.status(200).json(health)
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to get sleep scores.' });
        })
});

server.post('/api', checkJwt, checkAddScopes, (req, res) => {
    let health = req.body

    // This is a workaround because React Hook Forms doesn't have a good way to combine/add, and doing forms outside RHF feels messy.
    health.duration = (health.durationHours * 3600) + (health.durationMinutes * 60)
    delete health.durationHours;
    delete health.durationMinutes;

    health.user_id = req.user.sub
    if (health.summary_date && health.user_id && health.score_total && health.bedtime_start && health.readiness && health.hrv && health.rhr) {
        healthData.addHealth(health)
            .then(health => {
                res.status(201).json(health)
            })
            .catch(error => {
                res.status(500).json({ message: 'Failed to add sleep score.' })
            })
    }
    else {
        res.status(400).json({ message: 'Please provide a date, user id, sleep score, bedtime, sleep duration, readiness, HRV, and RHR.' })
    }
})

module.exports = server;