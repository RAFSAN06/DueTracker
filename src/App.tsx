
import React, { useState, useEffect } from 'react';
import './App.css';

interface DueItem {
  id: number;
  name: string;
  amount: number;
}

const DuesTracker: React.FC = () => {
  const [items, setItems] = useState<DueItem[]>(() => {
    const stored = localStorage.getItem('dues');
    return stored ? JSON.parse(stored) : [];
  });
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    localStorage.setItem('dues', JSON.stringify(items));
  }, [items]);

  const handleAddItem = () => {
    if (name.trim() && amount.trim()) {
      const newItem: DueItem = {
        id: Date.now(),
        name,
        amount: parseFloat(amount),
      };
      setItems([...items, newItem]);
      setName('');
      setAmount('');
    }
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totalAmount = items.reduce((total, item) => total + item.amount, 0);

  return (
    <div className="container">
      <h1>Dues Tracker</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <button onClick={handleAddItem}>Add</button>
      </div>
      <ul className="item-list">
        {items.map(item => (
          <li key={item.id}>
            <span>{item.name} — ${item.amount.toFixed(2)}</span>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="total">Total Due: ${totalAmount.toFixed(2)}</div>
    </div>
  );
};

export default DuesTracker;
