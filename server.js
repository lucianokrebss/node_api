const app = require("./src/app");
const mongoose = require("mongoose");

//Server Config
const port = process.env.PORT || 4000;

app.listen(port, function() {
  console.log(`Running on port ${port}`);
});

//Local MongoDB connection
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
