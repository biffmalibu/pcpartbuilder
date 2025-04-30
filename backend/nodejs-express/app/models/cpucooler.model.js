const e = require("express");

module.exports = (sequelize, Sequelize) => {
    const CPUCOOLER = sequelize.define("cpucooler", {
      name: {
        type: Sequelize.STRING
      },
      img_url: {
        type: Sequelize.STRING
      },
      cooler_url: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DOUBLE
      },
      manufacturer: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      part_number: {
        type: Sequelize.STRING
      },
      fan_rpm: {
        type: Sequelize.STRING
      },
      noise_level: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      height: {
        type: Sequelize.INTEGER
      },
      socket: {
        type: Sequelize.STRING
      },
      water_cooled: {
        type: Sequelize.STRING
      },
      fanless: {
        type: Sequelize.STRING
      },
    }, {
      timestamps: false
    });
  
    return CPUCOOLER;
  };