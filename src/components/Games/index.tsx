import React from "react";

interface Props {
  isGameRunning: boolean;
  filteredGames: {
    imgSrc: string | undefined;
    code: string;
    description: string;
    icon: string;
    name: string;
    categoryIds: number[];
  }[];
  handlePlayButtonClick: (gameCode: string) => void;
  categories: {id: number; name: string}[];
  handleCategoryClick: (categoryId: number) => void;
}

const Games = ({
  isGameRunning,
  filteredGames,
  handlePlayButtonClick,
  categories,
  handleCategoryClick,
}: Props) => {
  return (
    <div className="ui grid" style={{display: isGameRunning ? "none" : "initial"}}>
      <div className="twelve wide column">
        <h3 className="ui dividing header">Games</h3>

        <div className="ui relaxed divided game items links">
          {/* <!-- game item template --> */}
          {filteredGames.map((game, index) => {
            return (
              <div key={game.name + index} className="game item">
                <div className="ui small image">
                  <img src={game.imgSrc} alt="game-icon" />
                </div>
                <div className="content">
                  <div className="header">
                    <b className="name">{game.name}</b>
                  </div>
                  <div className="description">{game.description}</div>
                  <div className="extra">
                    <div
                      className="play ui right floated secondary button inverted"
                      onClick={() => handlePlayButtonClick(game.code)}>
                      Play
                      <i className="right chevron icon"></i>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* <!-- end game item template --> */}
        </div>
      </div>
      <div className="four wide column">
        <h3 className="ui dividing header">Categories</h3>

        <div className="ui selection animated list category items">
          {/* <!-- category item template --> */}
          <div className="category item">
            <div className="content">
              <div className="header">
                {categories.map((category) => {
                  return (
                    <p
                      className="button"
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}>
                      {category.name}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          {/* <!-- end category item template --> */}
        </div>
      </div>
    </div>
  );
};

export default Games;
