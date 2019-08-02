import React from 'react';
import "./index.css";
import SearchForm from "../SearchForm";
import ListItem from "../ListItem";
import googleAPI from "../../api/google.js";
import serverAPI from "../../api/server.js";

class Search extends React.Component {

  state = {
    books: [],
  }

  handleFormSubmit = (title, author) => {
    console.log("Search: search for author=" + author + " title=" + title);
    googleAPI.searchGoogleBooks(title, author)
      .then( (googleBooks) => {
        // object from google books is more complicated than we need so pick out only a
        // few fields
        // "googleBox" is the array from the items field in the google returned object
        console.log("Search: returned " + googleBooks.length + " items");
        let foundBooks = googleBooks.map( (bookDetails) => {
          // array contains multiple authors, have to copy array
          let authors = bookDetails.volumeInfo.authors.map( (author) => author);
          console.log(authors);
          return {
            authors: authors,
            image : bookDetails.volumeInfo.imageLinks.thumbnail,
            link: bookDetails.volumeInfo.infoLink,
            title: bookDetails.volumeInfo.title
          }
        });
        console.log("Search: mapped google books keys to app keys");
        console.log(foundBooks[0]);
        console.log(foundBooks[4]);
        this.setState({ books: foundBooks });
        console.log("Search: returned " +  googleBooks.length + " for Title " + title + " Author " + author);
      })
      .catch((err)=> {
        console.log("Search: error from accessing google API searchGoogleBooks");
      });
    
  }

  // bookId is the array index, don't have mongodb id because hasn't been saved yet
  handleBookSave = (bookId) => {
    // console.log("Save book " + bookId);
    serverAPI.saveOneBook(this.state.books[bookId])
      .then( () => {
        // remove entry from books array
        let newBooksList = this.state.books
        .slice(0,bookId)
        .concat(this.state.books
          .slice((bookId+1)));
        this.setState( { books: newBooksList});
      })
      .catch( (err) => {
        console.log("Search: error saving a book (handleBookSave)");
        console.log(err);
      });
  }
  

  render() {
    return (
      <div>
        <SearchForm handleSubmit={this.handleFormSubmit} />
        <div className="container">
            {this.state.books.length === 0 || 
              <div className="row SearchTitleBox">
                <h1>Books from Google search</h1>
              </div>
            }
          {/* Only render books list if there are books present */}
          {this.state.books.length > 0 && 
            this.state.books.map((book, index) => {
              return (
                <ListItem
                  bookData={book}
                  handleButton={this.handleBookSave}
                  key={index}
                  button="save"
                  bookId={index}
                />
              );
              })
          }
        </div>
      </div>
      
    );
  }
}

export default Search;