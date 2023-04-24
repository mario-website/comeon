import React from "react";
import LogoSvg from "../../assets/images/logo.svg";
import Login from "../Login";
import Casino from "../Casino";
import Ingame from "../Ingame";
import "./style.scss";

function App() {
  return (
    <>
      <div className="ui one column center aligned page grid">
        <div className="column twelve wide">
          <img src={LogoSvg} alt="logo" />
        </div>
      </div>
      <div className="main container">
        <Login />
        <Casino />
        <Ingame />
      </div>
    </>
  );
}

export default App;
