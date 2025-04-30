module.exports = app => {
    const storages = require("../controllers/storage.controller.js");
  
    var router = require("express").Router();

  
    // Retrieve all storage
    router.get("/", storages.findAll);
  
  
    // Retrieve a single storage with id
    router.get("/:id", storages.findOne);
  
  
    app.use('/api/storage', router);
  };