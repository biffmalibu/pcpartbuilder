const db = require("../models");
const CPUCOOLER = db.cpucoolers;
const Op = db.Sequelize.Op;


// Retrieve all coolers from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  CPUCOOLER.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving CPU coolers."
      });
    });
};

// Find a single cooler with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  CPUCOOLER.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find CPU cooler with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving CPU cooler with id=" + id
      });
    });
};
