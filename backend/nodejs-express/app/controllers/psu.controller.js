const db = require("../models");
const PSU = db.psus;
const Op = db.Sequelize.Op;


// Retrieve all psus from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  PSU.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving PSUs."
      });
    });
};

// Find a single PSU with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  PSU.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find PSU with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving PSU with id=" + id
      });
    });
};
