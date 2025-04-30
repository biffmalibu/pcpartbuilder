const e = require("express");

module.exports = (sequelize, Sequelize) => {
    const GPU = sequelize.define("gpu", {
      name: {
        type: Sequelize.STRING
      },
      img_url: {
        type: Sequelize.STRING
      },
      gpu_url: {
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
      chipset: {
        type: Sequelize.STRING
      },
      memory: {
        type: Sequelize.DOUBLE
      },
      memory_type: {
        type: Sequelize.STRING
      },
      core_clock: {
        type: Sequelize.INTEGER
      },
      boost_clock: {
        type: Sequelize.INTEGER
      },
      effective_memory_clock: {
        type: Sequelize.INTEGER
      },
      interfaces: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      frame_sync: {
        type: Sequelize.STRING
      },
      length: {
        type: Sequelize.INTEGER
      },
      tdp: {
        type: Sequelize.INTEGER
      },
      case_expansion_slot_width: {
        type: Sequelize.INTEGER
      },
      total_slot_width: {
        type: Sequelize.INTEGER
      },
      cooling: {
        type: Sequelize.STRING
      },
      external_power: {
        type: Sequelize.STRING
      },
      hdmi_outputs: {
        type: Sequelize.INTEGER
      },
      displayport_outputs: {
        type: Sequelize.INTEGER
      },
      dvid_dual_link_outputs: {
        type: Sequelize.INTEGER
      },
      hdmi_21a_outputs: {
        type: Sequelize.INTEGER
      },
      displayport_14_outputs: {
        type: Sequelize.INTEGER
      },
      displayport_14a_outputs: {
        type: Sequelize.INTEGER
      },
      displayport_21_outputs: {
        type: Sequelize.INTEGER
      },
      sli_crossfire: {
        type: Sequelize.STRING
      }

      
    }, {
      timestamps: false
    });
  
    return GPU;
  };