import './App.css';
import React, { useState, useEffect } from "react"
import SearchPage from './Components/SearchPage';
import Nominations from './Components/SearchPage';
require('dotenv').config()


let nominationList = []





function App() {
  return (
    <>
      <SearchPage />
    </>
  );
}

export default App;
