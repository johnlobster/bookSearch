import React from 'react';
import reactLogo from "../../images/react-logo.svg";
import "./index.scss";

// this is a placeholder

const changeTheme = (newTheme) => {
  console.log("Changing to theme " + newTheme);
  document.getElementById("root").setAttribute("data-theme", newTheme);
};

class Header extends React.Component {

  state = {
    theme : "themeA"
  }

clickHandler = () => {
  if( this.state.theme === "themeA") {
    changeTheme("themeB");
    this.setState( {theme: "themeB"});
  }
  else {
    changeTheme( "themeA");
    this.setState( {theme: "themeA"});
  }
}
  render() {
    return(
      <div>
        <h1 className="HeaderHeaderBox">
          <span>Book searcher</span>
          <span>
            <img src={reactLogo} className="HeaderReactLogo" alt="React logo" />
          </span>
        </h1>
        <button className="btn btn-danger" onClick={this.clickHandler} >Change theme</button>
      </div>
    );
  }
}

export default Header;