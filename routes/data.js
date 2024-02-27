const router = require('express').Router();
const client = require("./../postgre/client");

client.connect();

router.get("/", (req,res)=>{
    res.send("this is a data sending bit")
});

module.exports = router;