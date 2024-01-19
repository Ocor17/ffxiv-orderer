import React, { useState, useEffect } from "react";
import { auth } from "../../Firebase";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../../css/SignIn.css";
import { getUser } from "../Firestore";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if the user is already authenticated, redirect to home if true
    if (auth.currentUser) {
      console.log("User is already authenticated. Redirecting to home.");

      const fetchData = async () => {
        const active_user = await getUser(auth.currentUser.uid);
        console.log("Active User", active_user.displayName);

        if (active_user.active === true) {
          navigate(
            "/",
            { replace: true },
            { state: { current_user: active_user } }
          );
        }
      };
      fetchData();
    }
    //console.log("Effect called" );
    //console.log(auth.currentUser);
  }, [navigate]);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async () => {
        const active_user = await getUser(auth.currentUser.uid);
        navigate("/", { replace: true, state: { current_user: active_user } });
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
      <p className="forgot" align="center">
        <Link to="/signup">Sign Up</Link>
      </p>
      <p className="forgot" align="center">
        <Link to="/forgot">Forgot Password?</Link>
      </p>
    </div>
  );
};

export default SignIn;
