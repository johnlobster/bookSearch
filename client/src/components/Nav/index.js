import React from 'react';
import "./index.css";

class Nav extends React.Component {

  changeViewMode = (event) => {
    this.props.change(event.currentTarget.dataset.button);
  }
  
  render() {
    return (
      <div>
        <button onClick={this.changeViewMode} className="btn btn-primary" data-button="search">Search new books</button>
        <button onClick={this.changeViewMode} className="btn btn-secondary" data-button="saved">Saved books</button>

      </div>
    );
  }
}

export default Nav;