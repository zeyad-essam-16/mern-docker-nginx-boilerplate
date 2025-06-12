import { useEffect, useState } from 'react'
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
      <h1>MERN Docker App</h1>
      <p>Backend Message: {message}</p>
      <h2>Items:</h2>
      <ul>
        {items.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  )
}

export default App