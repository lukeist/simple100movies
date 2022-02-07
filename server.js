const movies = require("./movieData");
const express = require("express");
const cors = require("cors");
const app = express();
const movieData = movies.movieData;

const PORT = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// get all movies
app.get("/api/movies", (req, res) => {
  res.json(movieData);
  console.log(movieData);
});

// get movie when customer knows its id:
app.get("/api/movies/:id", (req, res) => {
  const idFromParams = req.params.id;
  const movieFromData = movieData.find((movie) => movie.id === idFromParams);
  const movieUnknown = movieData.find((movie) => movie.id === "unknown");
  // if req.params.id is matched with database?
  movieFromData
    ? res.json(movieFromData)
    : //   res.status(404).end();
      res.json(movieUnknown);
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
