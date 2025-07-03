import { useAppContext } from "../AppContext/AppContext";
import Dropdown from "../Components/Dropdown";

const About = () => {
  const { showMenu } = useAppContext();
  return <div className="relative h-[100vh] ">{showMenu && <Dropdown />}</div>;
};

export default About;
