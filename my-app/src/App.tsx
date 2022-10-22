import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [data, setData] = useState("Nothing");

  useEffect(() => {
    fetch("http://localhost:9000/react-test")
        .then(res => res.text())
        .then(res => setData(res));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>


    <p className="App-intro">API Response: {data}</p>
    </div>
  );
}

export default App;
