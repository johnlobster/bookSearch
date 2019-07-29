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
  console.log("Changing to theme " + newTheme);
  // document.getElementById("root").setAttribute("data-theme", newTheme);
  document.getElementById("themeSelector").className=newTheme;
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
        <Nav change={this.props.changeMode} />
      </div>
    );
  }
}

export default Header;