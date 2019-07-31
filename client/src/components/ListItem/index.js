import React from 'react';
import "./index.css";

// ListItem creates a complex set of bootstrap rows and columns to display a
// book description
// This is simpler than a table would be and allows for responsive design

// passes in button="search" or delete, according to list type
class ListItem extends React.Component {

  handleButtonClick = () => {
    this.props.handleButton(this.props.bookId);
  }

  render() {
    return (
      <div className="row ListItemParentRow">
        <div className="col-6 col-md-3">
          <img src={this.props.bookData.image} alt="book" className="ListItemImg" />
        </div>
        <div className="col-12 col-md-9">
          <div className="row">
            <div className="col-9">
              <h4 className="ListItemTitle ml-0">{this.props.bookData.title}</h4>
            </div>
            <div className="col-3">
              {this.props.button === "save"  ? (
                <button className="buttonGlobal ListItemSaveButton" onClick={this.handleButtonClick}>Save</button>
              ) : (
                <button className="buttonGlobal ListItemDeleteButton" onClick={this.handleButtonClick}>Delete</button>
              )}
              <a href={this.props.bookData.link}>
                <button className="buttonGlobal ListItemGoogleButton" >Google</button>
              </a>
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