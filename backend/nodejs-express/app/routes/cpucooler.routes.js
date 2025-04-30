module.exports = app => {
    const cpucoolers = require("../controllers/cpucooler.controller.js");
  
    var router = require("express").Router();

  
    // Retrieve all CPU Coolers
    router.get("/", cpucoolers.findAll);
  
  
    // Retrieve a single CPU Cooler with id
    router.get("/:id", cpucoolers.findOne);
  
  
    app.use('/api/cpucoolers', router);
  };