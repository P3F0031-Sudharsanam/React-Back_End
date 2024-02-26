const db = require("../models");
const Tbl = db.users;
const Op = db.Sequelize.Op;
const tableNameSingle = "User";
const tableNamePlural = "Users";

console.log(db); // Check the structure of the db object
console.log(Tbl); // Check if Tbl is defined and referencing the model

exports.create = (req, res) => {
  const reqData = {
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    // createdAt: req.body.createdAt,
    // createdBy: req.body.createdBy,
    // updatedAt: req.body.updatedAt,
    // updatedBy: req.body.updatedBy,
  };

  Tbl.create(reqData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while creating the ${tableNameSingle}.`,
      });
    });
};

exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: id } : null;

  Tbl.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while retrieving ${tableNamePlural}.`,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Tbl.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving ${tableNameSingle} with id=${id}`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Tbl.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `${tableNameSingle} was updated successfully.`,
        });
      } else {
        res.send({
          message: `Cannot update ${tableNameSingle} with id=${id}. Maybe ${tableNameSingle} was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating ${tableNameSingle} with id=${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Tbl.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `${tableNameSingle} was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete ${tableNameSingle} with id=${id}. Maybe ${tableNameSingle} was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete ${tableNameSingle} with id=${id}`,
      });
    });
};

exports.deleteAll = (req, res) => {
  Tbl.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} ${tableNamePlural} were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while removing all ${tableNamePlural}.`,
      });
    });
};

exports.getLimitedRecords = (req, res) => {
  let { page = 1, limit = 5 } = req.query;
  limit = parseInt(limit);
  const offset = (page - 1) * limit;
  Tbl.findAndCountAll({
    offset: offset,
    limit: limit,
  })
    .then((data) => {
      const { count, rows } = data;
      const totalPages = Math.ceil(count / limit);
      res.send({
        total: count,
        totalPages: totalPages,
        currentPage: page,
        users: rows,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while retrieving ${tableNamePlural}.`,
      });
    });
};
