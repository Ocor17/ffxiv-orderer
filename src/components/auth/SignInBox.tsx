import { useState, useEffect } from "react";
import { auth } from "../../Firebase";
import { useNavigate, Link } from "react-router-dom";
import "../../css/SignIn.css";
import { getUser, loginUser } from "../Firestore";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if the user is already authenticated, redirect to home if true
    //console.log("Auth", getUserAuth());
    if (auth.currentUser) {
      console.log("User is already authenticated. Redirecting to home.");

      const fetchData = async () => {
        const active_user = await getUser(auth?.currentUser?.uid);
        console.log("Active User", active_user?.displayName);

        if (active_user?.active === true) {
          navigate("/", {
            replace: true,
            state: { current_user: active_user.discord_name },
          });
        }
      };
      fetchData();
    }
    //console.log("Effect called" );
    //console.log(auth.currentUser);
  }, [navigate]);

  const signIn = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    //loginUser(email, password);
    //console.log(auth.currentUser);
    //console.log(auth.currentUser.uid)
    loginUser(email, password)
      .then(async () => {
        const active_user = await getUser(auth?.currentUser?.uid);
        sessionStorage.setItem("discord_name", active_user?.discord_name);
        if (active_user?.active !== true) {
          sessionStorage.clear();
          navigate("/signin", { replace: true });
          return;
        }
        console.log("User is authenticated. Redirecting to home.");
        navigate("/", {
          replace: true,
          state: { current_user: active_user?.discord_name },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main">
      <form className="form1" onSubmit={signIn}>
        <h1 className="sign">Log In</h1>
        <input
          className="un"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="pass"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <button className="submit" type="submit">
          Log In
        </button>
      </form>
      <p className="forgot" text-align="center">
        <Link to="/signup">Sign Up</Link>
      </p>
      <p className="forgot" text-align="center">
        <Link to="/forgot">Forgot Password?</Link>
      </p>
    </div>
  );
};

export default SignIn;
