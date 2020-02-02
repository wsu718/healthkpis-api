require('dotenv').config({ silent: process.env.NODE_ENV === 'production' })
const server = require('./server.js');

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});