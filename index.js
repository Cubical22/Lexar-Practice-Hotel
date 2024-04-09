const express = require('express');
const app = express();
const http = require("http").Server(app);
const data = require("./routes/data");

app.use(express.urlencoded({extended: true}));

// routes: 1. the display 2. data

// 2. the /data route is used to access info on the database
app.use("/data", data);

// 1. the main page display
// you can place your page inside views and replace the name below with your file's name
app.get("/", (req,res)=>{
    res.render("main.ejs"); // replace this with the name of your file
});

http.listen(3000, ()=>{ // the server runs on port 3000
    console.log("server started on port 3000 successfuly <3\nhttp://localhost:3000/");
});