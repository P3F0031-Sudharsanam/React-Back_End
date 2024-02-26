module.exports = (app) => {
  const tblController = require("../controllers/form.controller.js");

  var router = require("express").Router();

  router.post("/", tblController.create);

  router.get("/", tblController.findAll);

  router.get("/:id", tblController.findOne);

  router.put("/:id", tblController.update);

  router.delete("/:id", tblController.delete);

  router.delete("/", tblController.deleteAll);

  app.use("/api/forms", router);
};
