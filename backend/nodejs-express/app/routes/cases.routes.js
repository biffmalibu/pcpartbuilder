module.exports = app => {
    const cases = require("../controllers/cases.controller.js");
  
    var router = require("express").Router();

  
    // Retrieve all cases
    router.get("/", cases.findAll);
  
  
    // Retrieve a single cases with id
    router.get("/:id", cases.findOne);
  
  
    app.use('/api/cases', router);
  };