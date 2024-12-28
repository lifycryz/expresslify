const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
app.set("json spaces", 2);
const port = 3000;

//scraper by miftah
const axios = require('axios');

const fetchTikwmFeed = async (keywords, count = 12, cursor = 0, hd = 1) => {
  try {
    const response = await axios.post(
      'https://www.tikwm.com/api/feed/search',
      new URLSearchParams({
        keywords: keywords,
        count: count.toString(),
        cursor: cursor.toString(),
        web: '1',
        hd: hd.toString(),
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          Accept: 'application/json, text/javascript, */*; q=0.01',
          'X-Requested-With': 'XMLHttpRequest',
          'User-Agent':
            'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
          Referer: 'https://www.tikwm.com/',
        },
      }
    );

    // Return the JSON response
    return response.data;
  } catch (error) {
    // Handle and return error response
    return { error: error.response?.data || error.message };
  }
}

app.get("/", async (req, res) => {
  const { keywords } = req.query; // Mengambil parameter keywords dari query string

  if (!keywords) {
    return res.status(400).json({ error: "Parameter 'keywords' diperlukan." });
  }

  try {
    const result = await fetchTikwmFeed(keywords, 12, 0, 1); // Memasukkan keywords ke fungsi fetchTikwmFeed
    res.json(result); // Mengembalikan hasil dalam format JSON
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
