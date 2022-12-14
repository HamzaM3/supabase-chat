const axios = require('axios');
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })
const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())

app.post('/api/chat/', express.json(), async (req, res) => {

  const { name, content } = req.body;
  
  console.log('POST', req.body)

  await axios.post(
    process.env.SUPABASE_ENDPOINT,
    { name, content },
    {
      headers: {
        'Content-Type': 'application/json',
        'APIKEY': process.env.API_KEY,
      }
    }
  );

  res.end()
})

app.options(cors()) 

app.get('/api/chat/', async (req, res) => {
  console.log('GET')
  const r = await axios.get(process.env.SUPABASE_ENDPOINT + "?select=name,content&limit=50&offset=0&order=created_at.desc", {
    headers: {
      'APIKEY': process.env.API_KEY,
      "Accept": "application/json",
      'accept-encoding': '*',
    },
  });
  console.log(r.data[0])
  res.json(r.data.map((_, i) => r.data[r.data.length - i - 1]))
})

app.listen(5000)
