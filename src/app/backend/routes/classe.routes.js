module.exports = app => {
    const classes = require("../controllers/classe.controller.js");
  
    var router = require("express").Router();
  
    // Create a new classe
    router.post("/", classes.create);
  
    // Retrieve all classes
    router.get("/", classes.findAll);
  
  
    // Retrieve a single classe with id
    router.get("/:id", classes.findOne);
  
    // Update a classe with id
    router.put("/:id", classes.update);
  
    // Delete a classe with id
    router.delete("/:id", classes.delete);
    
    app.use("/api/classes", router);
  };
  