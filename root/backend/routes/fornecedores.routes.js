module.exports = app => {
    const fornecedores = require("../controllers/fornecedores.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", fornecedores.create);
  
    // Retrieve all Tutorials
    router.get("/", fornecedores.findAll);
  
    // Update a Tutorial with id
    router.put("/:id", fornecedores.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", fornecedores.delete);
  
    app.use('/t_fornecedores', router);
  };