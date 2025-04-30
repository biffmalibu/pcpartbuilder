module.exports = app => {
    const psus = require("../controllers/psu.controller.js");
  
    var router = require("express").Router();

  
    // Retrieve all PSUs
    router.get("/", psus.findAll);
  
  
    // Retrieve a single PSUs with id
    router.get("/:id", psus.findOne);
  
  
    app.use('/api/psus', router);
  };