const app = require("./src/app");
const port = process.env.PORT || 4000;

app.listen(port, function() {
  console.log(`Running on port ${port}`);
});
