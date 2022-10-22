import "bootstrap/dist/css/bootstrap.min.css"
import React, { useEffect, useState } from 'react';
import './Auth.css';
import logo from './blur.svg';


function Auth() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    // var emailInput = document.getElementById('email-input');
    // var pwdInput = document.getElementById('pwd-input');
    // var data = {
    //   email: emailInput.value,
    //   password: pwdInput.value,
    // };
    // Http
    //   .post('/api/auth/login', data)
    //   .then(() => {
    //     window.location.href = '/users';
    //   });

    console.log(email, password);
  };

  return (
    <div className="Auth-form-container">
      <div className="mb-5">
        <img src={logo} alt="logo" />
      </div>
      <form className="Auth-form">
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
            <button type="submit" className="btn btn-primary" onSubmit={login}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Auth;
