module.exports = app => {
    const motherboards = require("../controllers/motherboard.controller.js");
  
    var router = require("express").Router();

  
    // Retrieve all motherboards
    router.get("/", motherboards.findAll);
  
  
    // Retrieve a single motherboard with id
    router.get("/:id", motherboards.findOne);
  
  
    app.use('/api/motherboards', router);
  };