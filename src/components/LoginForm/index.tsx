import React, {useState, FormEvent, FC} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthDispatch} from "../../contexts/AuthContext";
// import "./LoginForm.module.css";

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const authDispatch = useAuthDispatch();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    //reset error message after every login try
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      // If the games API response is not ok, add the error to the error state and exit the function
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
        return;
      }

      const userData = await response.json();

      authDispatch({
        type: "LOGIN",
        payload: {
          player: userData.player,
        },
      });

      navigate("/casino");
    } catch (err) {
      setError("Error occurred during login. Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="ui grid centered">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="fields">
            <div className="required field">
              <div className="ui icon input">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <i className="user icon"></i>
              </div>
            </div>
            <div className="required field">
              <div className="ui icon input">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i className="lock icon"></i>
              </div>
            </div>
            <div className="field">
              <div className="ui icon input">
                <input type="submit" value="Login" />
                <i className="right chevron icon"></i>
              </div>
            </div>
          </div>
        </form>
        {error && (
          <div className="field ui error message input" style={{fontSize: "1rem"}}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
