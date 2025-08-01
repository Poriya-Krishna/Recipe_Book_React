import React from 'react';
import "../user/User.scss";

/**
 * Renders user details
 * @param {Object} user - The user object containing user information
 * @returns {JSX.Element} - The user details component
 */
const User = ({ user }) => {
  return (
    <div className="user-details-container">
      <div className="user-details-flex">
        <span className="user-name-style">
          {user?.firstName || "Guest"} {user?.lastName || ""}
        </span>
        <span className="user-email-style">
          {user?.email || "No email provided"}
        </span>
      </div>
      <div>
        <img
          src={
            user?.picture
              ? `/assets/${user.picture}`
              : "/assets/default-user.png"
          }
          alt={user?.picture || "User"}
          className="user-image-style"
        />
      </div>
    </div>
  );
};

export default User;
