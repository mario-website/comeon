import React from "react";
import Login from "../Login";
import Casino from "../Casino";
import Ingame from "../Ingame";
// import "./style.scss";

const Main = () => {
  return (
    <div className="main container">
      <Login />
      <Casino />
      <Ingame />
    </div>
  );
};

export default Main;
