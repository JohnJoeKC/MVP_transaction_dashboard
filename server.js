const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the 'test_site' directory
app.use(express.static(path.join(__dirname, 'test_site')));

// Send all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'test_site', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

