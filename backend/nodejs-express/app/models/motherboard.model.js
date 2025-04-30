const e = require("express");

module.exports = (sequelize, Sequelize) => {
    const MOTHERBOARD = sequelize.define("motherboard", {
      name: {
        type: Sequelize.STRING
      },
      img_url: {
        type: Sequelize.STRING
      },
      motherboard_url: {
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
      socket_cpu: {
        type: Sequelize.STRING
      },
      form_factor: {
        type: Sequelize.STRING
      },
      chipset: {
        type: Sequelize.STRING
      },
      memory_max: {
        type: Sequelize.INTEGER
      },
      memory_type: {
        type: Sequelize.STRING
      },
      memory_slots: {
        type: Sequelize.INTEGER
      },
      memory_speed: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      pcie_x16_slots: {
        type: Sequelize.INTEGER
      },
      pcie_x8_slots: {
        type: Sequelize.INTEGER
      },
      pcie_x4_slots: {
        type: Sequelize.INTEGER
      },
      pcie_x1_slots: {
        type: Sequelize.INTEGER
      },
      pci_slots: {
        type: Sequelize.INTEGER
      },
      m2_slots: {
        type: Sequelize.STRING
      },
      mini_pcie_slots: {
        type: Sequelize.INTEGER
      },
      half_mini_pcie_slots: {
        type: Sequelize.INTEGER
      },
      mini_pcie_msata_slots: {
        type: Sequelize.INTEGER
      },
      msata_slots: {
        type: Sequelize.INTEGER
      },
      sata_6_0_gbs: {
        type: Sequelize.INTEGER
      },
      onboard_ethernet: {
        type: Sequelize.STRING
      },
      onboard_video: {
        type: Sequelize.STRING
      },
      usb_2_0_headers: {
        type: Sequelize.INTEGER
      },
      usb_2_0_headers_single_port: {
        type: Sequelize.INTEGER
      },
      usb_3_2_gen_1_headers: {
        type: Sequelize.INTEGER
      },
      usb_3_2_gen_2_headers: {
        type: Sequelize.INTEGER
      },
      usb_3_2_gen_2x2_headers: {
        type: Sequelize.INTEGER
      },
      supports_ecc: {
        type: Sequelize.STRING
      },
      wireless_networking: {
        type: Sequelize.STRING
      },
      raid_support: {
        type: Sequelize.STRING
      },
    }, {
      timestamps: false
    });
  
    return MOTHERBOARD;
  };