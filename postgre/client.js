const {Client} = require('pg');

const client = new Client({
    user: "postgres",
    port: 5432,
    password: "AmirHosane2",
    database: "Hotel"
});

module.exports = client;