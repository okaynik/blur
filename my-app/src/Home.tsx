import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useContext } from "react";
import "./Auth.css";
import logo from "./blur.svg";
import { Http } from "./http";
import { AuthContext } from "./UserContext";

function Home() {
  const { username, auth } = useContext(AuthContext);
  return <div>home{username}</div>;
}

export default Home;
