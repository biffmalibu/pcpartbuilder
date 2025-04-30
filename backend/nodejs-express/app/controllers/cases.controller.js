const db = require("../models");
const CASE = db.cases;
const Op = db.Sequelize.Op;


// Retrieve all cases from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  CASE.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving CASEs."
      });
    });
};

// Find a single case with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  CASE.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find case with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving case with id=" + id
      });
    });
};
