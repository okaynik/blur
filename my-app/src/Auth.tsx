import "bootstrap/dist/css/bootstrap.min.css"
import React, { useEffect, useState } from 'react';
import './Auth.css';
import logo from './blur.svg';
import {Http} from './http';


function Auth() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (event: { key?: string; preventDefault: any; stopPropagation?: any; }) => {
    event.preventDefault();
    event.stopPropagation()
    console.log(email, password);
    console.log('form submitted ✅');

    var data = {email, password};
    Http
      .post('http://localhost:9000/api/auth/login', data)
      .then((res) => {
        var win = window.open("http://localhost:9000/api/users/all", '_blank');
        win?.focus();
      });
  };

  return (
    <div className="Auth-form-container">
      <div className="mb-5">
        <img src={logo} alt="logo" />
      </div>
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Auth;
