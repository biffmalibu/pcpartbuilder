const db = require("../models");
const GPU = db.gpus;
const Op = db.Sequelize.Op;


// Retrieve all gpus from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  GPU.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving GPUs."
      });
    });
};

// Find a single GPU with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  GPU.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find GPU with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving GPU with id=" + id
      });
    });
};
