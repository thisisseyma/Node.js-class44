import express from 'express';
import { API_KEY } from './sources/keys.js';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", async (req, res) => {
  const { cityName } = req.body;

  try {
    if (!cityName) {
      res.status(400);
      res.send({ weatherText: "City name is missing!" });
      return; 
    }

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}&units=metric`);
    const data = await response.json();

    if (data.name === undefined) {
      res.status(404);
      res.send({ weatherText: "City is not found!" }); 
    } else {
      const temperature = data.main.temp;
      res.send({ weatherText: `Weather in ${cityName}: ${temperature}°C` });
    }
  } catch (error) {
    console.error("Data fetching error");
    res.status(500);
    res.send("Internal server error");
  }
});
 
export default app;