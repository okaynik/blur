import logo from "../media/blur.svg";
import "../styles/Navbar.css"
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from "@fortawesome/free-solid-svg-icons";
import mockUserImg from "../test-data/mockUserImg.jpg";

export interface NavbarProps {
  isEditing: boolean;
  handleEdit: () => void;
}


export default function Navbar(props: NavbarProps) {

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
          <img className="logo" src={logo} alt="Logo" />
          <div className="input-container">
            <FontAwesomeIcon icon={faSearch} className="fa-search" />
            <input type="text" placeholder="Search.." />
          </div>
          <div className="btn-container">
            <button className="btn-dark" onClick={props.handleEdit}>
              {props.isEditing ? "Cancel" : "Ask"}
            </button>
            <button className="btn-dark" onClick={handleLogout}>
              Logout
            </button>
            <Link className="user" to={'/fakeuserid'}>
               <img src={mockUserImg} alt="User" />
            </Link>
          </div>
        </div>
      );
      
}
