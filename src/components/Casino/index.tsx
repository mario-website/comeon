import React, {useEffect, useState, FC} from "react";
import GameList from "../GameList";
import Games from "../Games";
import UserDashboard from "../UserDashboard";
import {useAuthState} from "../../contexts/AuthContext";

// import "./style.scss";

interface GamesData {
  imgSrc: string | undefined;
  code: string;
  description: string;
  icon: string;
  name: string;
  categoryIds: number[];
}

const Casino: FC = () => {
  const authState = useAuthState();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [categories, setCategories] = useState<{id: number; name: string}[]>([]);
  const [gamesData, setGamesData] = useState<GamesData[]>([]);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [error, setError] = useState([] as any);
  const [searchValue, setSearchValue] = useState("");
  const [filteredGames, setFilteredGames] = useState(gamesData);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  // This useEffect runs when searchValue or games or selectedCategory change.
  // It filters the games array based on the search value and selected category.
  useEffect(() => {
    let filtered = gamesData;

    if (searchValue) {
      filtered = filtered.filter((gameData) =>
        gameData.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (selectedCategory !== 0) {
      filtered = filtered.filter((gameData) =>
        gameData.categoryIds.includes(selectedCategory)
      );
    }

    setFilteredGames(filtered);
  }, [searchValue, gamesData, selectedCategory]);

  // If the user is authenticated, fetch games and categories data.
  useEffect(() => {
    if (authState.isAuthenticated) {
      fetchGamesAndCategoriesData();
    }
  }, [authState.isAuthenticated]);

  // This function fetches games and categories data for a specific user,
  // dynamically imports game icons and updates the state with the fetched data.
  const fetchGamesAndCategoriesData = async () => {
    try {
      const [gamesResponse, categoriesResponse] = await Promise.all([
        fetch("http://localhost:3001/games", {method: "get"}),
        fetch("http://localhost:3001/categories", {method: "get"}),
      ]);

      const [gamesData, categoriesData] = await Promise.all([
        gamesResponse.json(),
        categoriesResponse.json(),
      ]);

      // If the games API response is not ok, add the error to the error state and exit the function
      if (!gamesResponse.ok) {
        setError((prev: any[]) => {
          prev.push(gamesData.error);
        });
        return;
      }

      // If the games API response is not ok, add the error to the error state and exit the function
      if (!categoriesResponse.ok) {
        setError((prev: any[]) => {
          prev.push(categoriesData.error);
        });
        return;
      }

      // Dynamically import game icons and add them as imgSrc property
      // to each game object in gamesData array
      const updatedGamesData = await Promise.all(
        gamesData.map(async (game: {icon: string}) => {
          const imageModule = await import(`../../assets/${game.icon}`);
          return {...game, imgSrc: imageModule.default};
        })
      );

      setCategories(categoriesData);
      setGamesData(updatedGamesData);

      setIsDataLoaded(true);
    } catch (err) {
      setError((prev: string[]) => {
        prev.push("Error occurred during getting data. Please try again.");
      });
    }
  };

  // This function handles the play button click event for a game.
  // It sets isGameRunning to true and launches the game using the game library.
  const handlePlayButtonClick = (gameCode: string) => {
    setIsGameRunning(true);
    if (window.comeon && window.comeon.game) {
      window.comeon.game.launch(gameCode);
    } else {
      console.error("Game library not found.");
    }
  };

  // This function renders an error message if there are any errors.
  const renderError = () => {
    if (error.length > 0) {
      return <div className="ui error message">{error}</div>;
    }
    return null;
  };

  // This function renders a loading message if data is not yet loaded.
  const renderLoading = () => {
    if (!isDataLoaded) {
      return <div className="ui message">Is loading</div>;
    }
    return null;
  };

  // This function renders the casino components (UserDashboard, Games, GameList)
  // if the data is loaded and the user is authenticated.
  const renderCasino = () => {
    if (isDataLoaded && authState.isAuthenticated) {
      return (
        <div className="casino">
          <UserDashboard
            isGameRunning={isGameRunning}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <Games
            isGameRunning={isGameRunning}
            filteredGames={filteredGames}
            handlePlayButtonClick={handlePlayButtonClick}
            categories={categories}
            handleCategoryClick={handleCategoryClick}
          />
          <GameList isGameRunning={isGameRunning} setIsGameRunning={setIsGameRunning} />
        </div>
      );
    }
    return null;
  };

  // In the return statement, render the error, loading, and casino components using the helper functions.
  // If renderError() returns a non-null value, renderLoading() and renderCasino() will not be executed.
  // The rendering will wait until the error is resolved,
  // and then display the loading message and the casino components as needed.
  return (
    <>
      {renderError()}
      {renderLoading()}
      {renderCasino()}
    </>
  );
};

export default Casino;
