const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

//Conversor
app.use(express.json());


// Request headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4000");
  res.header(
    "Access-Allow-Headers",
    "Origin, X-requested-With, Content-Type, Accept",
    "application/x-www-form-urlencoded"
  );
  next();
});

//Routes
const sessions = require("./routes/sessionRoute");
const users = require("./routes/userRoutes");

app.use("/sessions", sessions);
app.use("/users", users);

//API-doc
app.use(express.static('doc'))
app.get('/api-doc',(req, res) => {
  res.sendFile(path.join( __dirname + './../doc/index.html'));
})


module.exports = app;