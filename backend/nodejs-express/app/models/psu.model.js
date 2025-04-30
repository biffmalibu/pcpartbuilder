const e = require("express");

module.exports = (sequelize, Sequelize) => {
    const PSU = sequelize.define("psu", {
      name: {
        type: Sequelize.STRING
      },
      img_url: {
        type: Sequelize.STRING
      },
      psu_url: {
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
      type: {
        type: Sequelize.STRING
      },
      efficiency_rating: {
        type: Sequelize.STRING
      },
      wattage: {
        type: Sequelize.INTEGER
      },
      length: {
        type: Sequelize.STRING
      },
      modular: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      fanless: {
        type: Sequelize.STRING
      },
      atx_4_pin_connectors: {
        type: Sequelize.INTEGER
      },
      eps_8_pin_connectors: {
        type: Sequelize.INTEGER
      },
      pcie_12_4_pin_12VHPWR_connectors: {
        type: Sequelize.INTEGER
      },
      pcie_12_pin_connectors: {
        type: Sequelize.INTEGER
     },
     pcie_8_pin_connectors: {
        type: Sequelize.INTEGER
     },
     pcie_6_2_pin_connectors: {
        type: Sequelize.INTEGER
     },
     pcie_6_pin_connectors: {
        type: Sequelize.INTEGER
     },
     sata_connectors: {
        type: Sequelize.STRING
     },
     molex_4_pin_connectors: {
        type: Sequelize.STRING
     },
     specs_number: {
        type: Sequelize.INTEGER
     },
    }, {
      timestamps: false
    });
  
    return PSU;
  };