import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "./Auth";
import Home from "./Home";
import AuthContextProvider from "./UserContext";

function App() {
  const [data, setData] = useState("Nothing");

  useEffect(() => {
    fetch("http://localhost:9000/react-test")
      .then((res) => res.text())
      .then((res) => setData(res));
  }, []);

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
