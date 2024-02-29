import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';




function App() {
  let [count, setCount] = useState(0);
  let [usersCount, setUsersCount] = useState(0);
  const clickOnMe = () => {
    setCount(count+1);
  }

  useEffect(() => {
    async function countUsers() {
      try {
        console.log(process.env.REACT_APP_SERVER_PORT)
        const api = axios.create({
          baseURL: `http://localhost:${process.env.REACT_APP_SERVER_PORT}`
        });

        const response = await api.get(`/users`);
        setUsersCount(response.length)
      } catch (error) {
        console.error(error);
      }
    }

    countUsers()
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code data-testid="code-app">src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={clickOnMe}>Click me</button>
        <span data-testid="count">{count}</span>
      </header>
    </div>
  );
}

export default App;
