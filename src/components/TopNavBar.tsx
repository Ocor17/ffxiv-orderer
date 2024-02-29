import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/TopNavBar.css";
import FCCrest from "../media/FCCrest.png";
import UserNav from "@/components/UserNav";
import { ModeToggle } from "./mode-toggle";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TopNavBar = ({ state }: any) => {
  //TODO fix issue with authUser Home button not passing state correctly
  const navigate = useNavigate();

  const [authUser, setAuthUser] = useState<boolean | null>(null); // Initially set to null

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setAuthUser(true);
      } else {
        setAuthUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (authUser) {
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
                to="/orderlist"
                state={state}
                onClick={() => navigate("/orderlist")}
              >
                Order List
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
  }
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
              onClick={() => navigate("/")}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="navItem"
              to="/signin"
              state={state}
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Link>
          </li>
          <li className="logout mr-5">
            <div className="mr-5">
              <ModeToggle />
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default TopNavBar;
