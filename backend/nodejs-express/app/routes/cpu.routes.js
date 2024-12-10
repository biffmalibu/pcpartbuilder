module.exports = app => {
    const cpus = require("../controllers/cpu.controller.js");
  
    var router = require("express").Router();

  
    // Retrieve all CPUs
    router.get("/", cpus.findAll);
  
  
    // Retrieve a single CPUs with id
    router.get("/:id", cpus.findOne);
  
  
    app.use('/api/cpus', router);
  };