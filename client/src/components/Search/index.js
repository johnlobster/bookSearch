import React from 'react';
import "./index.css";
import SearchForm from "../SearchForm";
import ListItem from "../ListItem";
import googleAPI from "../../api/google.js";

class Search extends React.Component {

  state = {
    books: [],
  }

  handleFormSubmit = (title, author) => {
    googleAPI.searchGoogleBooks(title, author)
      .then( (googleBooks) => {
        this.setState({ books: googleBooks });
        console.log("Search: Search for Title " + title + " Author " + author);
        console.log(googleBooks);
      })
    
  }

  handleBookSave = (bookId) => {
    console.log("Save book " + bookId);
  }
  

  render() {
    return (
      <div>
        <SearchForm handleSubmit={this.handleFormSubmit} />
        <div className="container">
          {/* Only render books list if there are books present */}
          {this.state.books.length > 0 && 
            this.state.books.map((book, index) => {
              return (
                <ListItem
                  bookData={book}
                  handleButton={this.handleBookSave}
                  key={index}
                  button="save"
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