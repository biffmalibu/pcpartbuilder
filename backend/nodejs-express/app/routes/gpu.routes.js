module.exports = app => {
    const gpus = require("../controllers/gpu.controller.js");
  
    var router = require("express").Router();

  
    // Retrieve all GPUs
    router.get("/", gpus.findAll);
  
  
    // Retrieve a single GPUs with id
    router.get("/:id", gpus.findOne);
  
  
    app.use('/api/gpus', router);
  };