const db = require("../models");
const MOTHERBOARD = db.motherboards;
const Op = db.Sequelize.Op;


// Retrieve all motherboards from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  MOTHERBOARD.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving motherboards."
      });
    });
};

// Find a single motherboard with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  MOTHERBOARD.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find motherboard with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving motherboard with id=" + id
      });
    });
};
