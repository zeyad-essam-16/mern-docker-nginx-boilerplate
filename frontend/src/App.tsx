import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [message, setMessage] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Access the API_URL from environment variables provided by Vite/Docker
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    fetch(`${API_URL}`)
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error("Error fetching message:", err));

    fetch(`${API_URL}/items`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error("Error fetching items:", err));
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>MERN Docker App</h1>
      <p>Backend Message: {message}</p>
      <h2>Items:</h2>
      <ul>
        {items.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App