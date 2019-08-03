const db = require("../models");

// controller acts between api and database

module.exports = {
  findAll: function (req, res) {
    // console.log("controller/books/findAll function");

    db.Book
      .find()
      // .sort({ createdDate: -1 })
      .then( (dbModel) => {
        console.log( `controller/books/findAll returned ${dbModel.length} records`);
        res.json(dbModel);
      })
      .catch( (err) => {
        console.log("controller/books/findAll error during db access");
        res.status(422).json(err);
      })
  },
  save: function (req, res) {
    console.log("controller/books/save function");
    let newBook = req.body;
    newBook.createdDate = new Date();
    if (newBook._id) {
      // weird error - sample data had _id field and mongoose crashed
      newBook._id = null;
    }
    // console.log(newBook);
    db.Book.create(newBook )
      .then((savedBook) => {
        if (savedBook === {}) {
          // no db error but not saved
          console.log("controller/books/save failed to save");
          res.status(422).json({ postSuccessful: false});
        }
        else {
          console.log("Save book success, returning 201");
          res.status(201).json({ postSuccessful: true, newBookId : savedBook._id });
        }
      })
      .catch( ( err ) => {
        console.log("controller/books/save error during db access " + err);
        res.status(422).json(err);
      })
  },
  delete: function (req, res) {
    // console.log("controller/books/delete function, delete id " + req.body.deleteId);
    db.Book.deleteOne({ _id: req.body.deleteId })
      .then( (result) => {
        if (result.deletedCount === 0) {
          console.log("controller/books/delete failed to delete id " + req.body.deleteId);
          res.status(422).json({
            deleteSuccessful: false
          });
        }
        else {
          // deleted book successfully, now return remaining books
          return db.Book.find()
        } 
      })
      .then((dbModel) => {
        console.log(`controller/books/delete found ${dbModel.length} records`);
        res.json({ deleteSuccessful: true, books: dbModel });
      })
      .catch( (err) => {
        console.log("Error occurred deleting item _id=" + req.body.deleteId);
        console.log(err.message);
        res.status(422).json({
          deleteSuccessful: false,
          error: err
        });
      });
  }
}