import React, {useState, FormEvent} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthDispatch} from "../../contexts/AuthContext";
// import "./LoginForm.module.css";

interface LoginFormProps {
  // Add any additional props needed for the LoginForm component
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const authDispatch = useAuthDispatch();

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
      navigate("/loginSucesfull");
    } catch (err) {
      setError("Error occurred during login. Please try again.");
    }
  };

  return (
    <div className="login" style={{display: "block"}}>
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
        {error && <div className="ui error message">{error}</div>}
      </div>
    </div>
  );
};

export default LoginForm;
