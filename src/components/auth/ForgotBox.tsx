import { useState } from "react";
import { auth } from "../../Firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "../../css/SignIn.css";

const Forgot = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const forgot = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");
        navigate("/signin", { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="main">
      <form className="form1" onSubmit={forgot}>
        <h1 className="sign">Reset Password</h1>
        <input
          className="un"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <button className="submit" type="submit">
          Reset
        </button>
      </form>
      <p className="forgot" text-align="center">
        <Link to="/signin">Sign In</Link>
      </p>
      <p className="forgot" text-align="center">
        <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Forgot;
