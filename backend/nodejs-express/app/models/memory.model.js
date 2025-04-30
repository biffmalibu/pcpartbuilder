const e = require("express");

module.exports = (sequelize, Sequelize) => {
    const MEMORY = sequelize.define("memory", {
      name: {
        type: Sequelize.STRING
      },
      img_url: {
        type: Sequelize.STRING
      },
      memory_url: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      part_number: {
        type: Sequelize.STRING
      },
      manufacturer: {
        type: Sequelize.STRING
      },
      speed: {
        type: Sequelize.STRING
      },
      form_factor: {
        type: Sequelize.STRING
      },
      modules: {
        type: Sequelize.STRING
      },
      priceGB: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      first_word_latency: {
        type: Sequelize.STRING
      },
      cas_latency: {
        type: Sequelize.STRING
      },
      voltage: {
        type: Sequelize.STRING
      },
      timing: {
        type: Sequelize.STRING
      },
      ecc_registered: {
        type: Sequelize.STRING
      },
      heat_spreader: {
        type: Sequelize.STRING
      },
      tdp: {
        type: Sequelize.INTEGER
      },
    }, {
      timestamps: false
    });
  
    return MEMORY;
  };