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
    googleAPI.searchGoogleBooks(title, author)
      .then( (googleBooks) => {
        this.setState({ books: googleBooks });
        console.log("Search: Search for Title " + title + " Author " + author);
      })
      .catch((err)=> {
        console.log("Search: error from accessing google API searchGoogleBooks");
      });
    
  }

  // bookId is the array index, don't have mongodb id because hasn't been saved yet
  handleBookSave = (bookId) => {
    console.log("Save book " + bookId);
    serverAPI.saveOneBook(this.state.books[bookId])
      .then( () => {
        // remove entry from books array
        let newBooksList = this.state.books
        .slice(0,bookId)
        .concat(this.state.books
          .slice((bookId+1)));
        this.setState( { books: newBooksList});
        console.log(newBooksList);
      })
      .catch( (err) => {
        console("Search: error deleting a book (handleBookSave)");
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