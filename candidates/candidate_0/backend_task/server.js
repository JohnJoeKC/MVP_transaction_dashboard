const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/api/data', (req, res) => {
  // Read data from data.json and send it as a response
  fs.readFile('../data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error reading data.json' });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
