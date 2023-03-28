import moment from "moment/min/moment-with-locales";
import { FaClock, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import TicketInfo from "./TicketInfo";

const Ticket = ({ _id, title, text, urgency, category, createdAt, status }) => {
  const { setEditTicket, deleteTicket } = useAppContext();

  moment.locale("en-gb");
  let date = moment(createdAt);
  date = date.format("LL");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{category.charAt(0)}</div>
        <div className="info">
          <h5>{category}</h5>
          <h5>{title}</h5>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <TicketInfo text={text} />
          <div className={`urgency ${urgency}`}>
            <FaClock /> {urgency}
          </div>
          <TicketInfo icon={<FaCalendarAlt />} text={date} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-ticket"
              className="btn edit-btn"
              onClick={() => setEditTicket(_id)}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteTicket(_id)}
            >
              Delete
            </button>
            <Link to="/comments" className="btn ">
              Comments
            </Link>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Ticket;
