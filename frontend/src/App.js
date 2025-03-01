import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [coin, setCoin] = useState('');
  const [messages, setMessages] = useState([]);

  const getSentiment = () => {
    axios.get(`http://localhost:3001/sentiment/${coin}`)
      .then(res => {
        let newMessages = [];
        for (let i = 0; i < messages.length; i++) {
          newMessages.push(messages[i]);
        }
        newMessages.push(`${res.data.trade} ${coin} (sentiment: ${res.data.sentiment})`);
        setMessages(newMessages);
        setCoin('');
      });
  };

  return (
    <div className="app">
      <h1>Crypto Trader Buddy</h1>
      <input
        value={coin}
        onChange={e => setCoin(e.target.value)}
        placeholder="Enter coin (e.g., BTC)"
      />
      <button onClick={getSentiment}>Check</button>
      <div>
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
    </div>
  );
}

export default App;