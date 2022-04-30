// import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import './App.css';
import MyMap from "./components/pigeon.js";
import MyData from "./components/mydata.js";


const App = () => {
  return (
    <div className="App">
      <MyMap />
      <MyData />
    </div>
  );
};

export default App;
