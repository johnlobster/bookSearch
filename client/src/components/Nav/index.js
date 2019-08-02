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
              <ModalHeader toggle={this.modalToggle}>Book searcher help</ModalHeader>
              <ModalBody>
                <p>
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