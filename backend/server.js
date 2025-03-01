const express = require('express');
const app = express();

console.log('Starting server...'); // Debug line

app.get('/', (req, res) => {
  res.send('Crypto Trader Buddy backend alive!');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server looping on ${PORT}`);
});