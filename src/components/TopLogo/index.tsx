import React from "react";
import LogoSvg from "../../assets/images/logo.svg";

// import "./style.scss";

const TopLogo = () => {
  return (
    <div className="ui one column center aligned page grid">
      <div className="column twelve wide">
        <img src={LogoSvg} alt="logo" />
      </div>
    </div>
  );
};

export default TopLogo;
