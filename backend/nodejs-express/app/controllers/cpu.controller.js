const db = require("../models");
const CPU = db.cpus;
const Op = db.Sequelize.Op;


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  CPU.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving CPUs."
      });
    });
};

// Find a single CPU with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  CPU.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find CPU with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving CPU with id=" + id
      });
    });
};
