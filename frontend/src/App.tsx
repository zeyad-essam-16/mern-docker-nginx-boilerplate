import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : import.meta.env.MODE === 'production'
      ? '/api'
      : 'http://localhost:5000/api';

  useEffect(() => {
    fetch(`${API_URL}/items`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error("Error fetching items:", err))
      .finally(() => setLoading(false));
  }, [API_URL]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    setAdding(true);
    try {
      const res = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newItem }),
      });
      const item = await res.json();
      setItems(prev => [...prev, item]);
      setNewItem('');
    } catch (err) {
      console.error("Add failed:", err);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/items/${id}`, { method: 'DELETE' });
      setItems(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="container">
      <h1>MERN_STARTER</h1>

      <form onSubmit={handleAdd} className="form">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add item..."
          className="input"
          disabled={adding}
        />
        <button type="submit" className="button" disabled={adding || !newItem.trim()}>
          {adding ? 'Adding...' : 'Add'}
        </button>
      </form>

      <h2>Items</h2>
      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <ul className="list">
          {items.map(item => (
            <li key={item._id} className="list-item">
              <span>{item.name}</span>
              <button className="delete-btn" onClick={() => handleDelete(item._id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
