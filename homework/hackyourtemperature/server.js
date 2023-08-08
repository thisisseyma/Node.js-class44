import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.use(express.json());

app.post("/weather", (req, res) => {
  const cityName = req.body.cityName;
  res.send(`City name: ${cityName}`);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));