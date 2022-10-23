import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  username: "",
  auth: false,
  login: (name: string) => {},
  logout: () => {},
});

// @function  UserProvider
// Create function to provide UserContext
const AuthContextProvider = (props: any): any => {
  const [user, setUser] = useState({ username: "", auth: false });

  const login = (name: string) => {
    setUser((user) => ({
      username: name,
      auth: true,
    }));
  };

  const logout = () => {
    setUser((user) => ({
      username: "",
      auth: false,
    }));
  };

  return (
    <AuthContext.Provider
      value={{ username: user.username, auth: user.auth, login, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
