require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { formatCurrency, createElement, fetchAndPopulateFiles, populateFileSelect } = require('./helper.js');

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

app.use(bodyParser.json());

app.post('/execute', async (req, res) => {
    const { code, language, stdin } = req.body;
  
    if (language === 'python') {
      try {
        const output = await execPythonCode(code, stdin);
        res.json({ output });
      } catch (error) {
        res.json({ error: error.toString() });
      }
    } else {
      res.json({ error: 'Invalid language' });
    }
  });
  
app.post('/openai', async (req, res) => {
    const { prompt } = req.body;
  
    try {
      const text = await callOpenAI(prompt);
      res.json({ text });
    } catch (error) {
      res.json({ error: error.toString() });
    }
});

const fetch = require('node-fetch');

app.get('/repo-content', async (req, res) => {
  const personalAccessToken = req.query.token;
  const path = req.query.path || "candidates/candidate_0/task";

  try {
    const files = await fetchRepositoryContent("JohnJoeKC", "MVP_transaction_dashboard", path, personalAccessToken);
    res.json(files);
  } catch (error) {
    console.error("Error fetching repository content:", error);
    res.status(500).json({ error: error.toString() });
  }
});

async function fetchRepositoryContent(owner, repo, path, personalAccessToken) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `token ${personalAccessToken}`
    }
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
}
