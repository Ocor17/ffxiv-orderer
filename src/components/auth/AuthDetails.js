import React, { useEffect, useState } from "react";
import { auth } from "../../Firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const usersignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out success");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {authUser ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          <button onClick={usersignOut}> Sign Out</button>
        </>
      ) : (
        <>Signed Out</>
      )}
    </div>
  );
};

export default AuthDetails;
