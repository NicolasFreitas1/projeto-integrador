import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Products from "./components/Products/Products";
import Stock from "./components/Stock/Stock";
import React from "react";

import "./App.css";
const App: React.FC = () => {
  return (
    <div className="App">
      <Login />
    </div>
  );
};

export default App;
