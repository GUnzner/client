import StatItems from "./StatItems";
import { useAppContext } from "../context/appContext";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";

const StatsContainer = () => {
  const { stats } = useAppContext();
  const defaultStats = [
    {
      title: "pending",
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "assigned",
      count: stats.assigned || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#A60A3D",
    },
    {
      title: "solved",
      count: stats.solved || 0,
      icon: <FaCalendarCheck />,
      color: "#71A92C",
      bcg: "#00873e",
    },
  ];
  return (
    <div>
      <Wrapper>
        {defaultStats.map((item, index) => {
          return <StatItems key={index} {...item} />;
        })}
      </Wrapper>
    </div>
  );
};

export default StatsContainer;
