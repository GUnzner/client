import { Logo } from "../components";
import Wrapper from "../assets/wrappers/LandingPage";
import { Link, Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import React from "react";

const Landing = () => {
  const { user } = useAppContext();
  return (
    <React.Fragment>
      {user && <Navigate to="/" />}
      <Wrapper>
        <div className="container page">
          <div className="info">
            <Logo />
            <h1>Help Desk</h1>
            <p>Welcome to the Help Desk</p>
            <Link to="/register" className="btn btn-hero">
              Login/Register
            </Link>
          </div>
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

export default Landing;
