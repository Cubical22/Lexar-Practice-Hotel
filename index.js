const express = require('express');
const app = express();
const http = require("http").Server(app);
const data = require("./routes/data");

app.use(express.urlencoded({extended: true}));

// routes: 1. the display 2. data

// 2.
app.use("/data", data);

// 1.
app.get("/", (req,res)=>{
    res.render("main.ejs");
});

http.listen(3000, ()=>{
    console.log("server started on port 3000 successfuly <3\nhttp://localhost:3000/");
});