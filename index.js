// require('dotenv').config();
// console.log(require('dotenv').config())
// console.log(require('dotenv').config({ debug: true }));
const server = require('./server.js');

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});