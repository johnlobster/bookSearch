import React from 'react';
import "./index.css";
import SearchForm from "../SearchForm";
import ListItem from "../ListItem";

const sampleBooks = [
  
  {
  authors: ["Suzanne Collins"],
  description: "Set in a dark vision of the near future, a terrifying reality TV show is taking place. Twelve boys and twelve girls are forced to appear in a live event called The Hunger Games. There is only one rule: kill or be killed. When sixteen-year-old Katniss Everdeen steps forward to take her younger sister's place in the games, she sees it as a death sentence. But Katniss has been close to death before. For her, survival is second nature.",
  image: "http://books.google.com/books/content?id=sazytgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
  link: "http://books.google.com/books?id=sazytgAACAAJ&dq=title:The+Hunger+Games&hl=&source=gbs_api",
  title: "The Hunger Games"
  }
];

class Search extends React.Component {

  state = {
    books: [],
  }

  handleFormSubmit = (title, author) => {
    this.setState( { books: sampleBooks});
    console.log("Search for Title "+ title + " Author " + author);
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
                  handleSave={this.handleBookSave}
                  key={index}
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