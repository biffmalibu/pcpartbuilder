const e = require("express");

module.exports = (sequelize, Sequelize) => {
    const CASE = sequelize.define("case", {
      name: {
        type: Sequelize.STRING
      },
      img_url: {
        type: Sequelize.STRING
      },
      case_url: {
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
      color: {
        type: Sequelize.STRING
      },
      power_supply: {
        type: Sequelize.STRING
      },
      side_panel: {
        type: Sequelize.STRING
      },
      power_supply_shroud: {
        type: Sequelize.STRING
      },
      front_panel_usb: {
        type: Sequelize.STRING
      },
      motherboard_form_factor: {
        type: Sequelize.STRING
      },
      maximum_video_card_length: {
        type: Sequelize.DOUBLE
      },
      drive_bays: {
        type: Sequelize.STRING
      },
      expansion_slots: {
        type: Sequelize.STRING
      },
      dimensions: {
        type: Sequelize.STRING
     },
     volume: {
        type: Sequelize.DOUBLE
     },
    }, {
      timestamps: false
    });
  
    return CASE;
  };