module.exports = (sequelize, Sequelize) => {
  const STORAGE = sequelize.define("storage", {
    name: {
      type: Sequelize.STRING
    },
    img_url: {
      type: Sequelize.STRING
    },
    product_url: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.DOUBLE
    },
    capacity: {
      type: Sequelize.INTEGER
    },
    priceGB: {
      type: Sequelize.DOUBLE
    },
    cache: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    form_factor: {
      type: Sequelize.STRING
    },
    interfaces: {
      type: Sequelize.STRING
    },
    manufacturer: {
      type: Sequelize.STRING
    },
    tdp : {
      type: Sequelize.INTEGER
    },
  }, {
    timestamps: false,
  });

  return STORAGE;
};