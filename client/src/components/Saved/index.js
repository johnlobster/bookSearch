import React from 'react';
import "./index.css";

import ListItem from "../ListItem";
import serverAPI from "./../../api/server";

class Saved extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    serverAPI.getAllBooks(). 
      then( (allBooks) => {
        this.setState( {books: allBooks});
      })
      .catch( (err) => {
        console.log("Error in Saved, calling API.getAllBooks");
      })
  }

  handleBookDelete = (bookId) => {
    console.log("Delete book " + bookId);
  }
  render() {
    return (
      <div>
        <h1>Saved</h1>
        {/* Only render books list if there are books present */}
        {this.state.books.length > 0 &&
          this.state.books.map((book, index) => {
            return (
              <ListItem
                bookData={book}
                handleButton={this.handleBookDelete}
                key={index}
                button="delete"
              />
            );
          })
        }
      </div>
    )
  }
}

export default Saved;