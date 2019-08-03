import React from 'react';
import "./index.css";

import ListItem from "../ListItem";
import serverAPI from "./../../api/server";

class Saved extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    serverAPI.getAllBooks() 
      .then( (allBooks) => {
        this.setState( {books: allBooks});
      })
      .catch( (err) => {
        console.log("Error in Saved:, calling API.getAllBooks");
        console.log(err);
      })
  }

  handleBookDelete = (bookId) => {
    // console.log("Saved: book id " + bookId);
    serverAPI.deleteOneBook(bookId)
      .then( (newBookList) => {
        this.setState({books :newBookList});
      })
      .catch ( (err) => {
        console.log("Saved: error in deleteOneBook");
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row SavedTitleBox">
          {this.state.books.length === 0 ? (
            <h1>No books saved to reading list</h1>
          ): (
            <h1>Reading list</h1>
          )}
        </div>
        {/* Only render books list if there are books present */}
        {this.state.books.length > 0 &&
          this.state.books.map((book, index) => {
            return (
              <ListItem
                bookData={book}
                handleButton={this.handleBookDelete}
                key={index}
                button="delete"
                bookId={book._id}
              />
            );
          })
        }
      </div>
    )
  }
}

export default Saved;