const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

//Conversor
app.use(express.json());

//Conexão local MongoDB
mongoose
  .connect("mongodb://localhost:27017/TesteProviDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(error => handleError(error));

let db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error:"));
db.once("open", function() {
  console.log("MongoDB connection succeeded");
});

//Headers requisições
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Allow-Headers",
    "Origin, X-requested-With, Content-Type, Accept"
  );
  next();
});

//Rotas
const sessions = require("./routes/sessionRoute");
const users = require("./routes/userRoutes");

app.use("/sessions", sessions);
app.use("/users", users);


module.exports = app;