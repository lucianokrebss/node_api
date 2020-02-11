const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.promise = global.Promise;

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === "ns not found") return;
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (error.message.includes("a background operation is currently running"))
        return;
      console.log(error.message);
    }
  }
}

module.exports = {
  setupDB(unitTestDB_Provi) {
    // Connect to Mongoose
    beforeAll(async () => {
      await mongoose
        .connect("mongodb://localhost:27017/unitTestDB_Provi", {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
        .catch(error => handleError(error));

      let db = mongoose.connection;
      db.on("error", console.log.bind(console, "connection error:"));
      db.once("open", function() {
        console.log("MongoDB test connection succeeded");
      });
    });

    // Cleans up database and Disconnect Mongoose after finished all the tests
    afterAll(async () => {
      await dropAllCollections();
      await removeAllCollections();
      await mongoose.connection.close();
    });
  }
};
