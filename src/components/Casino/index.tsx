import React, {useEffect, useState} from "react";
import {useAuthState, useAuthDispatch} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

// import "./style.scss";

const Casino: React.FC = () => {
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();
  const [avatarSrc, setAvatarSrc] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [categories, setCategories] = useState<{id: number; name: string}[]>([]);
  const [games, setGames] = useState<
    {
      imgSrc: string | undefined;
      code: string;
      description: string;
      icon: string;
      name: string;
      categoryIds: number[];
    }[]
  >([]);
  const [error, setError] = useState([] as any);

  const [searchValue, setSearchValue] = useState("");
  const [filteredGames, setFilteredGames] = useState(games);
  const [selectedCategory, setSelectedCategory] = useState(0);
  // Handle category click

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  // Filter the games array based on the search value and selected category
  useEffect(() => {
    let filtered = games;

    if (searchValue) {
      filtered = filtered.filter((game) =>
        game.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (selectedCategory !== 0) {
      filtered = filtered.filter((game) => game.categoryIds.includes(selectedCategory));
    }

    setFilteredGames(filtered);
  }, [searchValue, games, selectedCategory]);

  // ... (other functions)

  // Handle search input value change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // Filter the games array based on the search value
  useEffect(() => {
    if (searchValue) {
      setFilteredGames(
        games.filter((game) =>
          game.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else {
      setFilteredGames(games);
    }
  }, [searchValue, games]);

  const fetchData = async () => {
    try {
      const [gamesResponse, categoriesResponse] = await Promise.all([
        fetch("http://localhost:3001/games", {method: "get"}),
        fetch("http://localhost:3001/categories", {method: "get"}),
      ]);

      const [gamesData, categoriesData] = await Promise.all([
        gamesResponse.json(),
        categoriesResponse.json(),
      ]);

      // Check if responses are ok
      if (!gamesResponse.ok) {
        setError((prev: any[]) => {
          prev.push(gamesData.error);
        });
        return;
      }

      if (!categoriesResponse.ok) {
        setError((prev: any[]) => {
          prev.push(categoriesData.error);
        });
        return;
      }

      const updatedGamesData = await Promise.all(
        gamesData.map(async (game: {icon: string}) => {
          const imageModule = await import(`../../assets/${game.icon}`);
          return {...game, imgSrc: imageModule.default};
        })
      );

      console.log(`updatedGamesData:`, updatedGamesData);
      console.log(`categoriesData:`, categoriesData);
      setCategories(categoriesData);
      setGames(updatedGamesData);

      setIsDataLoaded(true);
    } catch (err) {
      setError((prev: string[]) => {
        prev.push("Error occurred during getting data. Please try again.");
      });
    }
  };

  useEffect(() => {
    if (authState.isAuthenticated) {
      fetchData();
    }
  }, [authState.isAuthenticated]);

  const {
    name = undefined,
    avatar = undefined,
    event = undefined,
  } = authState.player || {};

  //
  useEffect(() => {
    const importImage = async () => {
      const imageModule = await import(`../../assets/${avatar}`);
      setAvatarSrc(imageModule.default);
    };
    importImage();
  }, [avatar]);

  const handleLogOut = () => {
    authDispatch({
      type: "LOGOUT",
    });
    navigate("/logOutSucesfull");
  };

  const handlePlayButtonClick = (gameCode: string) => {
    console.log(`gameCode:`, gameCode);
    if (window.comeon && window.comeon.game) {
      window.comeon.game.launch(gameCode);
    } else {
      console.error("Game library not found.");
    }
  };

  return (
    <>
      {error.length > 0 ? (
        <div className="ui error message">{error}</div>
      ) : !isDataLoaded ? (
        <div className="ui message">Is loading</div>
      ) : (
        <div
          className="casino"
          style={{display: authState.isAuthenticated ? "initial" : "none"}}>
          <div className="ui grid centered">
            <div className="twelve wide column">
              <div className="ui list">
                {/* <!-- player item template --> */}
                <div className="player item">
                  <img className="ui avatar image" src={avatarSrc} alt="avatar" />

                  <div className="content">
                    <div className="header">
                      <b className="name">{name}</b>
                    </div>
                    <div className="description event">{event}</div>
                  </div>
                </div>
                {/* <!-- end player item template --> */}
              </div>
              <div
                className="logout ui left floated secondary button inverted"
                onClick={handleLogOut}>
                <i className="left chevron icon"></i>Log Out
              </div>
            </div>
            <div className="four wide column">
              <div className="search ui small icon input ">
                <input
                  type="text"
                  placeholder="Search Game"
                  value={searchValue}
                  onChange={handleSearch}
                />
                <i className="search icon"></i>
              </div>
            </div>
          </div>
          <div className="ui grid">
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
                <div className="ingame">
                  <div className="ui grid centered">
                    <div className="three wide column">
                      <div className="ui right floated secondary button inverted">
                        <i className="left chevron icon"></i>Back
                      </div>
                    </div>
                    <div className="ten wide column">
                      <div id="game-launch"></div>
                    </div>
                    <div className="three wide column"></div>
                  </div>
                </div>
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
        </div>
      )}
    </>
  );
};

export default Casino;
