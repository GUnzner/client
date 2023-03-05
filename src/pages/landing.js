import { Logo } from "../components";
import Wrapper from "../assets/wrappers/LandingPage";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>Help Desk</h1>
          <p>Welcome to the Help Desk</p>
          <button className="btn btn-hero">Login/Register</button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Landing;
