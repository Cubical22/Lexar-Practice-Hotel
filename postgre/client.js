const {Client} = require('pg');

// you have to set up your own server using the admin
// then change the fields below relating to your own data base
// just make sure you have entered everything correctly
// and used the backup data
const client = new Client({
    user: "postgres",
    port: 5432,
    password: "AmirHosane2",
    database: "Hotel"
});

module.exports = client;