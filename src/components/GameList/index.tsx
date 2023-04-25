import React, {useRef} from "react";

// import "./style.scss";

const GameList = ({
  isGameRunning,
  setIsGameRunning,
}: {
  isGameRunning: boolean;
  setIsGameRunning: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const gameLaunchRef = useRef<HTMLDivElement | null>(null);

  const removeGameLaunchChildren = () => {
    if (gameLaunchRef.current) {
      while (gameLaunchRef.current.firstChild) {
        gameLaunchRef.current.removeChild(gameLaunchRef.current.firstChild);
      }
    }
  };

  const handleBackButton = () => {
    setIsGameRunning(false);
    removeGameLaunchChildren();
  };

  return (
    <div className="ingame" style={{display: isGameRunning ? "block" : "none"}}>
      <div className="ui grid centered">
        <div className="three wide column">
          <div
            className="ui right floated secondary button inverted"
            onClick={handleBackButton}>
            <i className="left chevron icon"></i>Back
          </div>
        </div>
        <div className="ten wide column">
          <div id="game-launch" ref={gameLaunchRef}></div>
        </div>
        <div className="three wide column"></div>
      </div>
    </div>
  );
};

export default GameList;
