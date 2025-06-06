const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

app.use(cors());

app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'pages', 'searchHospital.html'));
});

app.get('/search', async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).send({ error: 'Query parameter is required' });
  }

  try {
    const response = await fetch(`https://openapi.naver.com/v1/search/blog.json?query=${encodeURIComponent(query)}&display=10&start=1&sort=sim`, {
      method: 'GET',
      headers: {
        'X-Naver-Client-Id': 'caw9dguoHrSsVW7VArQQ',
        'X-Naver-Client-Secret': 'ajWkgu0Jcj'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('NAVER API Error:', response.status, errorData);
      return res.status(response.status).send({ error: 'NAVER API Error', details: errorData });
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