// ProfileButton.js
import { Link } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProfileButton = ({ user }: any) => {
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
