const db = require("../models");
const Classe = db.classes;

// Create and Save a new classe
exports.create = (req, res) => {
  // Validate request
  if (!req.body.libelle) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a classe
  const classe = new Classe({
    libelle: req.body.libelle
  });

  // Save classe in the database
  classe
    .save(classe)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the classe."
      });
    });
};

// Retrieve all classes from the database.
exports.findAll = (req, res) => {
  const libelle = req.body.libelle;
  var condition = libelle ? { libelle: { $regex: new RegExp(libelle), $options: "i" } } : {};

  Classe.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving classes."
      });
    });
};

// Find a single classe with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Classe.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found classe with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving classe with id=" + id });
    });
};

// Update a classe by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  Classe.findByIdAndUpdate(id, req.body, { new: true })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update classe with id=${id}. Maybe classe was not found!`
        });
      } else res.send(data); 
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating classe with id=" + id
      });
    });
};


// Delete a classe with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Classe.findByIdAndDelete(id, { new: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete classe with id=${id}. Maybe classe was not found!`
        });
      } else {
        res.send({
          message: "classe was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete classe with id=" + id
      });
    });
};


