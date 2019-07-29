import React from 'react';
import Header from "./components/Header";
import Navbar from "./components/Navbar";

import "./App.scss";

// have to access #root element to read style and change
// attribute to get new style that will alter the css --variables and change theme
function App() {
  return (
    <div>
      <Header />
      <Navbar />
    </div>
  );
}

export default App;
