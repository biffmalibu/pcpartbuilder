const e = require("express");

module.exports = (sequelize, Sequelize) => {
    const CPU = sequelize.define("cpu", {
      name: {
        type: Sequelize.STRING
      },
      img_url: {
        type: Sequelize.STRING
      },
      cpu_url: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DOUBLE
      },
      manufacturer: {
        type: Sequelize.STRING
      },
      part_number: {
        type: Sequelize.STRING
      },
      series: {
        type: Sequelize.STRING
      },
      microarchitecture: {
        type: Sequelize.STRING
      },
      core_family: {
        type: Sequelize.STRING
      },
      socket: {
        type: Sequelize.STRING
      },
      cores: {
        type: Sequelize.INTEGER
      },
      pcore_clock: {
        type: Sequelize.DOUBLE
      },
      pcore_bclock: {
        type: Sequelize.DOUBLE
      },
      ecore_clock: {
        type: Sequelize.DOUBLE
      },
      ecore_bclock: {
        type: Sequelize.DOUBLE
      },
      l2_cache: {
        type: Sequelize.INTEGER
      },
      l3_cache: {
        type: Sequelize.INTEGER
     },
     tdp: {
        type: Sequelize.INTEGER
     },
     integrated_graphics: {
        type: Sequelize.STRING
     },
     max_supported_memory: {
        type: Sequelize.INTEGER
     },
     ecc_support: {
        type: Sequelize.STRING
     },
     includes_cooler: {
        type: Sequelize.STRING
     },
     packaging: {
        type: Sequelize.STRING
     },
     lithography: {
        type: Sequelize.INTEGER
     },
     includes_cpu_cooler: {
        type: Sequelize.STRING
     },
     sim_multithreading: {
        type: Sequelize.STRING
     },
    }, {
      timestamps: false
    });
  
    return CPU;
  };