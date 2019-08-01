// stub for now
const router = require("express").Router();
const bookController = require("../controller/books.js");

// Matches with "/api"
// controller/books accesses database and returns request

router
  .route("/api")
  .get(bookController.findAll)
  .post(bookController.save)
  .delete(bookController.delete);

module.exports = router;