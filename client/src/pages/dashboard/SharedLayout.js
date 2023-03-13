import { Outlet, Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/RegisterPage";

const SharedLayout = () => {
  return (
    <Wrapper>
      <nav>
        <Link to="add-ticket">Add ticket</Link>
        <Link to="all-tickets">All tickets</Link>
      </nav>
      <Outlet />
    </Wrapper>
  );
};

export default SharedLayout;
