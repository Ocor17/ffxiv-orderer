// ProfileButton.js
import React from "react";
import { Link } from "react-router-dom";

const ProfileButton = ({ user }) => {
  // Customize the rendering based on your design and user information
  return (
    <Link to="/profile">
      <div>
        {/* Your profile button content, e.g., avatar or user name */}
        {user && user.displayName}
      </div>
    </Link>
  );
};

export default ProfileButton;
