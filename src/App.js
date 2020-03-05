import React, { useState } from "react";
import "./App.css";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { Routes } from "./routes";

function App({ location }) {
  const [collapse, setCollapse] = useState(false);
  const handleCollapse = () => {
    setCollapse(!collapse);
  };
  return (
    <>
      <Header handleCollapse={handleCollapse} />
      <Sidebar collapse={collapse} handleCollapse={handleCollapse} />
      <Routes location={location} />
    </>
  );
}

export default App;
