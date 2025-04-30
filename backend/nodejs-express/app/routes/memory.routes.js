module.exports = app => {
  const memorys = require("../controllers/memory.controller.js");

  var router = require("express").Router();


  // Retrieve all MEMORYs
  router.get("/", memorys.findAll);


  // Retrieve a single MEMORYs with id
  router.get("/:id", memorys.findOne);


  app.use('/api/memory', router);
};