import React from "react";

// import "./style.scss";

const GameList = ({
  isGameRunning,
  setIsGameRunning,
}: {
  isGameRunning: boolean;
  setIsGameRunning: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="ingame" style={{display: isGameRunning ? "block" : "none"}}>
      <div className="ui grid centered">
        <div className="three wide column">
          <div
            className="ui right floated secondary button inverted"
            onClick={() => setIsGameRunning(false)}>
            <i className="left chevron icon"></i>Back
          </div>
        </div>
        <div className="ten wide column">
          <div id="game-launch"></div>
        </div>
        <div className="three wide column"></div>
      </div>
    </div>
  );
};

export default GameList;
