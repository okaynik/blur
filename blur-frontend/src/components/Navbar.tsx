import logo from "../media/blur.svg";
import "../styles/Navbar.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import mockUserImg from "../test-data/mockUserImg.jpg";

export default function Navbar() {
  //logout
  const { user, logout, isLoading } = useAuth0();

  useEffect(() => {
    // if (isLoading) return;
    if (!user) {
      logout({ returnTo: window.location.origin });
    }
  }, [isLoading]);

  const handleLogout = () => {
    logout({
      returnTo: window.location.origin,
    });
  };

  return (
    <div className="background">
      <Link to={`/main`}>
        <img className="logo" src={logo} alt="Logo" />
      </Link>
      <div className="input-container">
        <FontAwesomeIcon
          icon={faSearch}
          className="fa-search"
          // onChange = {}
        />
        <input type="text" placeholder="Search.." />
      </div>
      <div className="btn-container">
        <Link className="btn-dark" to={"/newpost"}>
          Ask
        </Link>
        <button className="btn-dark" onClick={handleLogout}>
          Logout
        </button>
        <Link className="user" to={"/fakeuserid"}>
          <img src={mockUserImg} alt="User" />
        </Link>
      </div>
    </div>
  );
}
