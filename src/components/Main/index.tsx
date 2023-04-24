import React from "react";
import {useAuthState} from "../../contexts/AuthContext";
import LoginForm from "../LoginForm";
import Casino from "../Casino";
// import "./style.scss";

const Main: React.FC = () => {
  const authState = useAuthState();
  return (
    <div className="main container">
      {authState.isAuthenticated ? <Casino /> : <LoginForm />}
    </div>
  );
};

export default Main;
