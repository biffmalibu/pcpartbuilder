const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Node.js server for PCPartBuilder running on port 8080" });
});

require("./app/routes/cpu.routes")(app);
require("./app/routes/cpucooler.routes")(app);
require("./app/routes/gpu.routes")(app);
require("./app/routes/cases.routes")(app);
require("./app/routes/psu.routes")(app);
require("./app/routes/memory.routes")(app);
require("./app/routes/motherboard.routes")(app);
require("./app/routes/storage.routes")(app);
require("./app/routes/build.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});