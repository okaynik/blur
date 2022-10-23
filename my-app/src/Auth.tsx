import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useContext } from "react";
import "./Auth.css";
import logo from "./blur.svg";
import { Http } from "./http";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./UserContext";

function Auth() {
  let [authMode, setAuthMode] = useState("signin");
  const navigate = useNavigate();
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const context = useContext(AuthContext);
  if (context.auth) {
    navigate("/main");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleLogin = (event: {
    key?: string;
    preventDefault: any;
    stopPropagation?: any;
  }) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(email, password);
    console.log("form submitted ✅");

    var data = { email, password };
    Http.post("http://localhost:9000/api/auth/login", data).then((res) => {
      console.log(res);
      if (res.status === 200) {
        // context.login(res.data);
        context.login("TEST");
        navigate("/main");
        console.log(res);
        // navigate("/home");
      }
    });
  };

  const handleSignup = (event: {
    key?: string;
    preventDefault: any;
    stopPropagation?: any;
  }) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(email, password);
    console.log("form submitted ✅");

    var data = { email, password };
    Http.post("http://localhost:9000/api/auth/login", data).then((res) => {
      console.log(res);
      navigate("/home");
    });
  };

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <div>{context.auth}</div>
        <div className="mb-5">
          <img src={logo} alt="logo" />
        </div>
        <form className="Auth-form" onSubmit={handleLogin}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-dark"
                onSubmit={handleLogin}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="Auth-form-container">
        <div className="mb-5">
          <img src={logo} alt="logo" />
        </div>
        <form className="Auth-form" onSubmit={handleSignup}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="username"
                className="form-control mt-1"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-dark"
                onSubmit={handleSignup}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Auth;
