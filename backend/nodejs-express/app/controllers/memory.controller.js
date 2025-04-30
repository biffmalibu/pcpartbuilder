const db = require("../models");
const MEMORY = db.memorys;
const Op = db.Sequelize.Op;


// Retrieve all memorys from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  MEMORY.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving memorys."
      });
    });
};

// Find a single memory with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  MEMORY.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find memory with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving memory with id=" + id
      });
    });
};
