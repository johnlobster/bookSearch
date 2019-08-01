const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const UserSchema = new Schema({
  authors: [String],
  description: String,
  image: String,
  link: String,
  title: String,
  createdDate: Date
});

// This creates our model from the above schema, using mongoose's model method
const Book = mongoose.model("Book", UserSchema);

// Export the User model
module.exports = Book;
