import React from 'react';
import "./index.css";

class Nav extends React.Component {

  changeViewMode = (event) => {
    this.props.change(event.currentTarget.dataset.button);
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
              <button className="buttonGlobal NavThemeButton" onClick={this.props.themeHandler} >Change theme</button>
            </span>
          </div>
        </div>
    );
  }
}

export default Nav;