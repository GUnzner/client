import { Logo } from "../components";
import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
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
  );
};

export default Landing;
