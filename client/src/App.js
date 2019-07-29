import React from 'react';
import Header from "./components/Header";
import Navbar from "./components/Navbar";

import "./styles/global.css"
import "./App.css";

// have to access #root element to read style and change
// attribute to get new style that will alter the css --variables and change theme
function App() {
  return (
    <div id="themeSelector" className= "themeA">
      <Header />
      <Navbar />
    </div>
  );
}

export default App;
