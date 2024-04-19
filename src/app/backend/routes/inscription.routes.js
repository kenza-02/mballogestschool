module.exports = app => {
    const inscriptions = require("../controllers/inscription.controller.js");
  
    var router = require("express").Router();
  
    // Create a new inscription
    router.post("/", inscriptions.create);
  
    // Retrieve all inscriptions
    router.get("/", inscriptions.findAll); 
  
  
    // Retrieve a single inscription with id
    router.get("/:id", inscriptions.findOne);
  
    // Update a inscription with id
    router.put("/:id", inscriptions.update);
  
    // Delete a inscription with id
    router.delete("/:id", inscriptions.delete);
    
    app.use("/api/inscriptions", router);
  };
  