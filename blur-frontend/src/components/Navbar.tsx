import logo from "../media/blur.svg";
import "../styles/Navbar.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import mockUserImg from "../test-data/mockUserImg.jpg";

export default function Navbar() {
  //logout
  const { user, logout, isLoading } = useAuth0();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

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

  const handleChange = (e: any) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate(`/main/${query}`);
  };

  return (
    <div className="background">
      <Link to={`/main`}>
        <img className="logo" src={logo} alt="Logo" />
      </Link>
      <div className="search">
        <div className="input-container">
          <FontAwesomeIcon icon={faSearch} className="fa-search" />
          <input
            type="text"
            placeholder="Search..."
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
          />
        </div>
        <button className="btn-dark" onClick={handleSubmit}>
          Search
        </button>
      </div>
      <div className="btn-container">
        <Link className="btn-dark" to={"/newpost"}>
          Ask
        </Link>
        <button className="btn-dark" onClick={handleLogout}>
          Logout
        </button>
        <Link className="user" to={"/user"}>
          <img src={user?.picture} alt="User" />
        </Link>
      </div>
    </div>
  );
}
