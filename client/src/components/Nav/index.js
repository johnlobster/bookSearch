import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./index.css";

// handles screen switching, help modal, and theme switching (light/dark)
class Nav extends React.Component {
  state = {
    modal: false
  };
  changeViewMode = (event) => {
    this.props.change(event.currentTarget.dataset.button);
  }
  
  modalToggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
        <div className="NavBox">
          <div className="NavButtonBox">
            <span>
              <button onClick={this.changeViewMode} className="buttonGlobal NavButton" 
                data-button="search">Search new books</button>
              <button onClick={this.changeViewMode} className="buttonGlobal NavButton" 
                data-button="saved">Saved books</button>
            </span>
            <span>
            <button className="buttonGlobal NavHelpModalOpenButton" onClick={this.modalToggle}>Help</button>
            <Modal isOpen={this.state.modal} toggle={this.modalToggle} className={this.props.className}>
              <ModalHeader toggle={this.modalToggle}><strong>Book searcher help</strong></ModalHeader>
              <ModalBody>
                <p>
                  This app will let you search for a book on google books. It then displays a list of results, 
                  showing information about the book, including a "Google" button that will take you to the google information
                  page about the book.
                </p>
                <p>
                  Clicking on the "save" button on the search results page will save that book information.
                  Clicking on the "Saved books" button will take you to the other page, where there is a list of
                  books that you previously saved. This list is very similar to the "search new books" page, but 
                  instead of a "save" button, there is a "delete" button that will remove that books info item from
                  your list of saved books
                </p>
                <p>
                  The "theme" button at top right will switch between light (day) and dark(night) themes
                </p>
                <p>
                  The search button will not appear until has been entered in the Title or Author fields
                </p>
              </ModalBody>
              <ModalFooter>
                <button className="buttonGlobal NavHelpModalCloseButton" onClick={this.modalToggle}>Cancel</button>
              </ModalFooter>
            </Modal>
              <button className="buttonGlobal NavThemeButton" onClick={this.props.themeHandler} >Change theme</button>
            </span>
          </div>
        </div>
    );
  }
}

export default Nav;