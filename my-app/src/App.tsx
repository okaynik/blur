import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Auth from "./Auth";

function App() {

  const [data, setData] = useState("Nothing");

  useEffect(() => {
    fetch("http://localhost:9000/react-test")
        .then(res => res.text())
        .then(res => setData(res));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
