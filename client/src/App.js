import React from 'react';
import Header from "./components/Header";
import Navbar from "./components/Navbar";

import "./styles/global.css"
import "./App.css";

// them is setup by setting class on the enclosing div named themeSelector
// change the class to whatever theme you want, themes defined in "./styles/global.css"

function App() {
  return (
    <div id="themeSelector" className= "themeA">
      <Header />
      <Navbar />
    </div>
  );
}

export default App;
