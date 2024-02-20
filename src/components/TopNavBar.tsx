import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/TopNavBar.css";
import FCCrest from "../media/FCCrest.png";
import UserNav from "@/UserNav";
import { ModeToggle } from "./mode-toggle";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TopNavBar = ({ state }: any) => {
  //TODO fix issue with authUser Home button not passing state correctly
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <>
      <nav className="navBar">
        <ul className="navList">
          <li className="navItemimg">
            <img src={FCCrest} alt="FC Crest" />
          </li>
          <li>
            <Link
              className="navItem"
              to="/"
              state={state}
              onClick={() => navigate("/home")}
            >
              Home
            </Link>
          </li>
          <li className="logout mr-5">
            <div className="mr-5">
              <ModeToggle />
            </div>
            <UserNav />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default TopNavBar;
