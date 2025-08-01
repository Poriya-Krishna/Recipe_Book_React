import React, { useState } from "react";
import "../header/Header.scss";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faGear } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../state/index";

function Header({ searchRecipes, isHome, handleNavigateHome, handleNavigateProfile }) {
  const dispatch = useDispatch();

  // Use "id" instead of "_id"
  const user = useSelector((state) => state.user);
  const userId = user?.id;

  const [showDropdown, setShowDropdown] = useState(false);
  const [inputData, setInputData] = useState("");

  /** Handle search input */
  function handleInput(e) {
    e.preventDefault();
    if (inputData.trim() === "") return;
    searchRecipes(inputData.trim());
    setInputData("");
  }

  return (
    <div className="header-wrapper">
      {/* Logo */}
      <div className="logo-wrapper" onClick={handleNavigateHome}>
        <img src={logo} alt="logo" className="logo-image" />
        <span className="name">Recipe Book</span>
      </div>

      {/* Search Bar (only on home page) */}
      {isHome && (
        <form className="input-wrapper" onSubmit={handleInput}>
          <input
            required
            type="text"
            value={inputData}
            className="header-input"
            onChange={(e) => setInputData(e.target.value)}
            placeholder="What do you want to cook today?"
          />
          <button type="submit" className="search-icon-wrapper">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          </button>
        </form>
      )}

      {/* User Profile Section */}
      <div className="profile-section-wrapper">
        <FontAwesomeIcon
          className="gear-icon"
          icon={faGear}
          onClick={() => setShowDropdown(!showDropdown)}
        />
        {/* Profile info */}
        <div
          className="profile-settings-wrapper"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img
            className="user-image"
            // Use local assets path or fallback image
            src={user?.picture ? `/assets/${user.picture}` : "/assets/default-user.png"}
            alt="user"
          />
          <span className="user-name">
            {user?.firstName} {user?.lastName}
          </span>
        </div>

        {/* Dropdown */}
        <div className={`dropdown-wrapper ${showDropdown ? "show" : "hide"}`}>
          <span
            className="dropdown-profile"
            onClick={() => handleNavigateProfile(userId)}
          >
            Profile
          </span>
          <span
            className="dropdown-logout"
            onClick={() => dispatch(setLogout())}
          >
            Logout
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
