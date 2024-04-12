require("dotenv").config();
const {Client} = require('pg');

// you have to set up your own server using the admin
// then change the fields below relating to your own data base
// just make sure you have entered everything correctly
// and used the backup data
console.log(process.env);

const client = new Client({
    user: "postgres",
    port: 5432,
    password: process.env["PG_PASS"],
    database: "Hotel"
});

module.exports = client;