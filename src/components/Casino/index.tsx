import React, {useEffect, useState} from "react";
import GameList from "../GameList";

import {useAuthState, useAuthDispatch} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

// import "./style.scss";

const Casino = () => {
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();
  const [avatarSrc, setAvatarSrc] = useState("");
  const [categories, setCategories] = useState<{id: number; name: string}[]>([]);
  const [error, setError] = useState([] as any);

  const gamesList = async () => {
    try {
      const response = await fetch("http://localhost:3001/games", {method: "get"});

      if (!response.ok) {
        const errorData = await response.json();
        setError((prev: any[]) => {
          prev.push(errorData.error);
        });
        return;
      }

      const gamesData = await response.json();
    } catch (err) {
      setError((prev: string[]) => {
        prev.push("Error occurred during getting games data. Please try again.");
      });
    }
  };
  const categoriesList = async () => {
    try {
      const response = await fetch("http://localhost:3001/categories", {method: "get"});

      if (!response.ok) {
        const errorData = await response.json();
        setError((prev: any[]) => {
          prev.push(errorData.error);
        });
        return;
      }

      const categoriesData = await response.json();
      setCategories(categoriesData);
    } catch (err) {
      setError((prev: string[]) => {
        prev.push("Error occurred during getting categories data. Please try again.");
      });
    }
  };

  useEffect(() => {
    if (authState.isAuthenticated) {
      gamesList();
      categoriesList();
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

  return (
    <>
      {error.length > 0 ? (
        <div className="ui error message">{error}</div>
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
                <input type="text" placeholder="Search Game" />
                <i className="search icon"></i>
              </div>
            </div>
          </div>
          <div className="ui grid">
            <div className="twelve wide column">
              <h3 className="ui dividing header">Games</h3>

              <div className="ui relaxed divided game items links">
                {/* <!-- game item template --> */}
                <div className="game item">
                  <div className="ui small image">
                    <img src="" alt="game-icon" />
                  </div>
                  <div className="content">
                    <div className="header">
                      <b className="name"></b>
                    </div>
                    <div className="description"></div>
                    <div className="extra">
                      <div className="play ui right floated secondary button inverted">
                        Play
                        <i className="right chevron icon"></i>
                      </div>
                    </div>
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
                        return <p key={category.id}>{category.name}</p>;
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
