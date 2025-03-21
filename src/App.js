import './App.css';
import { countUsers } from './api';
import Form from "./components/Form";
import { useState, useEffect } from 'react';

function App() {
  let [usersCount, setUsersCount] = useState(0);
  
  useEffect(() => {
    const setUsers = async () => {
      try {
        let count = await countUsers();
        setUsersCount(count)
      } catch (error) {
        //console.error(error);
      }
    }

    setUsers()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Users manager</h1>
        <Form />
        <p><span data-testid="count">{usersCount}</span> user(s) already registered</p>
      </header>
    </div>
  );
}
export default App;
