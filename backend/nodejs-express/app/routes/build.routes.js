module.exports = (app) => {
    const builds = require("../controllers/build.controller.js");
  
    var router = require("express").Router();
  
    // Generate PC builds
    router.post("/", builds.generateBuilds);
  
    app.use("/api/builds", router);
  };