import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/TopNavBar.css";
import FCCrest from "../media/FCCrest.png";
import { getUserAuth, logoutUser } from "./Firestore";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TopNavBar = ({ state }: any) => {
  //TODO fix issue with authUser Home button not passing state correctly
  const navigate = useNavigate();
  //const { state } = useLocation();
  //const state = getAuth();
  //console.log("location HOME", state);
  const [authUser] = useState(getUserAuth());
  //const auth = getAuth();
  //console.log("AUTH CURRENT USER TOP NAV BAR", auth.currentUser);
  console.log("NAVBAR AUTH USER", authUser);

  useEffect(() => {}, []);

  const usersignOut = () => {
    logoutUser()
      .then(() => {
        sessionStorage.clear();
        console.log("sign out success");

        navigate("/signin", { replace: true });
      })
      .catch((error) => console.log(error));
  };

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
          <li className="logout">
            <button className="navItem" onClick={usersignOut}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default TopNavBar;
