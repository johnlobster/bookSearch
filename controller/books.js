const db = require("../models");

module.exports = {
  findAll: function (req, res) {
    db.Book
      .find()
      .sort({ createdDate: -1 })
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
    let newBook = req.body;
    let now = new Date();
    newBook.createdDate = now;
    db.Book.create(newBook, (err, savedBook) => {
      console.log(savedBook)
      if( err ) {
        console.log("controller/books/save error during db access");
        res.status(422).json(err);
      }
      else if (savedBook.length === 0) {
        // no db error but not saved
        console.log("controller/books/save failed to save");
        res.status(422).json(savedBook);
      }
      else {
        res.status(201).json({ postSuccessful: true});
      }
    })
  },
  delete: function (req, res) {
    db.Book.deleteOne({ _id: req.body.deleteId }, (err) => { 
      if (err) {
        console.log("controller/books/save failed to delete id " + req.body.deletedId);
        res.status(422).json(err);
      }
      else {
        res.json("deleteSuccessful: true");
      }
    });
  }
}