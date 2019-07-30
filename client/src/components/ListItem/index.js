import React from 'react';
import "./index.css";

class ListItem extends React.Component {

  handleSaveButton = () => {
    this.props.handleSave("bookId");
  }

  render() {
    return (
      <div className="row">
        <div className="col-6 col-md-3">
          <img src={this.props.bookData.image} alt="book" className="ListItemImg" />
        </div>
        <div className="col-12 col-md-9">
          <div className="row">
            <div className="col-9">
              {this.props.bookData.title}
            </div>
            <div className="col-3">
              <button className="ListItemSaveButton" onClick={this.handleSaveButton}>Save</button>
            </div>
          </div>
          <div className="row">
            <p>
                <span>Author(s)</span>
                {this.props.bookData.authors.map( (author, index) => {
                  return (
                    <span key={index}>{author}</span>
                  )
                })}
            </p>
          </div>
          <div className="row">
            <p className="ListItemDescription">
              {this.props.bookData.description}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default ListItem;