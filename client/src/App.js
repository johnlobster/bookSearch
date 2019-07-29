import React from 'react';
import Header from "./components/Header";
import Search from "./components/Search";
import Saved from "./components/Saved";


import "./styles/global.css"
import "./App.css";

// theme is setup by setting class on the enclosing div named themeSelector
// change the class to whatever theme you want, themes defined in "./styles/global.css"

class App extends React.Component {

  state = {
    userMode: "search"
  }

  changeMode = (newMode) => {
    if ( this.state.userMode===newMode) {
      // no change
    }
    else {
      this.setState( { userMode: newMode});
    }
  }

  render() {
    return (
    <div id="themeSelector" className= "themeA">
      <Header changeMode={this.changeMode} />
      { this.state.userMode === "search" ? (
        <Search />
      ): (
        <Saved />
      )}
    </div>
  ) ;
  }
}

export default App;
