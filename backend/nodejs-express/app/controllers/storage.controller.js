const db = require("../models");
const STORAGE = db.storages;
const Op = db.Sequelize.Op;


// Retrieve all storage from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  STORAGE.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Storage."
      });
    });
};

// Find a single Storage with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  STORAGE.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Storage with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Storage with id=" + id
      });
    });
};
