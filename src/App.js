import React from "react";
import Nav from "./Components/Nav";
import { BrowserRouter } from "react-router-dom";
import './App.scss';
import Routes from "./Components/Routes";

function App() {
  return (
    <div className="App"> 
      <Nav />
      <div className="container-fluid main-container">
        <BrowserRouter>
          <Routes/>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
