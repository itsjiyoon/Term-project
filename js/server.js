const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;


const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

app.use(cors());

app.get('/search', async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).send({ error: 'Missing query parameter' });
  }

  try {
    const response = await fetch(`https://openapi.naver.com/v1/search/blog.json?query=${query}&display=10&start=1&sort=sim`, {
      method: 'GET',
      headers: {
        'X-Naver-Client-Id': '',
        'X-Naver-Client-Secret': ''
      }
    });

    if (!response.ok) {
      return res.status(response.status).send({ error: 'NAVER API Error' });
    }

    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});