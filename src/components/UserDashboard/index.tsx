import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthState, useAuthDispatch} from "../../contexts/AuthContext";

interface Props {
  isGameRunning: boolean;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const UserDashboard = ({isGameRunning, searchValue, setSearchValue}: Props) => {
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();
  const [avatarSrc, setAvatarSrc] = useState();

  const {
    name = undefined,
    avatar = undefined,
    event = undefined,
  } = authState.player || {};

  // Load user's avatar image dynamically and set it as the avatarSrc state
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
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
        {/* <!-- search --> */}
        <div
          className="search ui small icon input "
          style={{display: isGameRunning ? "none" : "initial"}}>
          <input
            type="text"
            placeholder="Search Game"
            value={searchValue}
            onChange={handleSearch}
          />
          <i className="search icon"></i>
        </div>
        {/* <!-- end search --> */}
      </div>
    </div>
  );
};

export default UserDashboard;
