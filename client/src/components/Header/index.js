import React from 'react';
import reactLogo from "../../images/react-logo.svg";
import "./index.css";
import Nav from "../Nav";

const changeTheme = (newTheme) => {
  const allThemes = [
    "themeA",
    "themeB"
  ];
  if (! allThemes.includes(newTheme)) {
    console.log("Tried to change to non-existent theme " + newTheme);
    return;
  }
  // console.log("Changing to theme " + newTheme);
  // this is implemented with a single class on <body>. Using className in this way overwrites all classes
  document.getElementsByTagName("BODY")[0].className = newTheme;

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
      <div className="HeaderSurroundingBox">
        <h1 className="HeaderHeaderBox">
          <span>Book searcher</span>
          <span>
            <img src={reactLogo} className="HeaderReactLogo" alt="React logo" />
          </span>
        </h1>
        <Nav 
          change={this.props.changeMode}
          themeHandler={this.clickHandler}
        />
      </div>
    );
  }
}

export default Header;