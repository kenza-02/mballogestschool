const db = require("../models");
const Inscription = db.inscriptions;

// Create and Save a new inscription
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a inscription
  const inscription = new Inscription({
    nom: req.body.nom,
    prenom: req.body.prenom,
    genre: req.body.genre,
    classe: req.body.classe,
    date_naiss: req.body.date_naiss
  });

  // Save inscription in the database
  inscription.save()
  .then(result => {
    Inscription
       .populate(inscription, { path: "classe" })
       .then(data => {
          res.json(data);
       })
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the inscription."
    });
  });

};

// Retrieve all inscriptions from the database.
exports.findAll = (req, res) => {
  const nom = req.body.nom;
  var condition = nom ? { nom: { $regex: new RegExp(nom), $options: "i" } } : {};
  Inscription
   .find(condition)
   .populate("classe") // key to populate
   .then(data => {
      res.json(data); 
   })
   .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving inscriptions."
    });
  });
};

// Find a single inscription with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Inscription.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found inscription with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving inscription with id=" + id });
    });
};

// Update a inscription by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Inscription.findByIdAndUpdate(id, req.body, { new: true })
    .populate("classe")
    .then(data => {
      res.json(data); 
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating inscription with id=" + id
      });
    });
};

// Delete a inscription with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Inscription.findByIdAndDelete(id, { new: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete inscription with id=${id}. Maybe inscription was not found!`
        });
      } else {
        res.send({
          message: "inscription was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete inscription with id=" + id
      });
    });
};



