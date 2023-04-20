import logo from "../media/blur.svg";
import "../styles/Navbar.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Hamburger() {
  return (
    <div className="hamburger">
      <div className="burger burger1" />
      <div className="burger burger2" />
      <div className="burger burger3" />
    </div>
  );
}

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

  // mobile device navbar
  const [windowDimension, setWindowDimension] = useState(window.innerWidth);

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimension <= 640;
  const [openDrawer, toggleDrawer] = useState(false);
  const drawerRef = useRef<any>();

  useEffect(() => {
    /* Close the drawer when the user clicks outside of it */
    const closeDrawer = (event: any) => {
      if (drawerRef.current && drawerRef.current.contains(event.target)) {
        return;
      }

      toggleDrawer(false);
    };

    document.addEventListener("mousedown", closeDrawer);
    return () => document.removeEventListener("mousedown", closeDrawer);
  }, []);

  if (isMobile) {
    return (
      <div className="background-mobile">
        <Link to={`/main`}>
          <img className="logo" src={logo} alt="Logo" />
        </Link>
        <div className="search-mobile">
          <div className="input-container-mobile">
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
        </div>
        <div className="hamburger" onClick={() => toggleDrawer(!openDrawer)}>
          <Hamburger />
        </div>
        {
          <div
            className={`drawer ${openDrawer ? "drawer-open" : ""}`}
            ref={drawerRef}
          >
            <div
              className="close-button"
              onClick={() => toggleDrawer(!openDrawer)}
            >
              &times;
            </div>
            <div className="drawer-item">
              <Link to={`/main`} onClick={() => toggleDrawer(!openDrawer)}>
                Home
              </Link>
            </div>

            <div className="drawer-item">
              <Link to={`/newpost`}>Ask</Link>
            </div>
            <div className="drawer-item">
              <Link to={`/user/`}>My profile</Link>
            </div>
            <div className="drawer-item">
              <Link to={`/`} onClick={handleLogout}>
                Logout
              </Link>
            </div>
          </div>
        }
      </div>
    );
  }

  const handleClickIcon = () => {
    navigate('../',{replace:true})
  };

  const darkModeButton = document.getElementById("dark-mode-button");
    darkModeButton?.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
  });
  

  return (
    <div className="background">
      <div onClick={handleClickIcon}>
        <img className="logo" src={logo} alt="Logo" />
      </div>
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
        <button className="btn-dark" id="dark-mode-button">
              Dark Mode
          </button>
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
