const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cpus = require("./cpu.model.js")(sequelize, Sequelize);
db.cpucoolers = require("./cpucooler.model.js")(sequelize, Sequelize);
db.gpus = require("./gpu.model.js")(sequelize, Sequelize);
db.cases = require("./cases.model.js")(sequelize, Sequelize);
db.psus = require("./psu.model.js")(sequelize, Sequelize);
db.memorys = require("./memory.model.js")(sequelize, Sequelize);
db.motherboards = require("./motherboard.model.js")(sequelize, Sequelize);
db.storages = require("./storage.model.js")(sequelize, Sequelize);

module.exports = db;