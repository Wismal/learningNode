const express = require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const { dir } = require('node:console')
const app = express()
app.use(express.json()) // Middleware to parse JSON request bodies
app.disable('x-powered-by') // Disable the 'X-Powered-By' header

app.get('/movies', (req, res) => {
  const { genre } = req.query // req it is an object that contains the query parameters

  /*
  only works if the user types the genre correctly in the URL (not case-sensitive)
if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.includes(genre)
    )
    return res.json(filteredMovies)
  } */
  if (genre) {
    const filteredMovies = movies.filter(movie =>
      movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies) // Return all movies if no genre is specified
})

// path-to-regex
// You can use path-to-regex to match the URL pattern

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) {
    res.json(movie)
  } else {
    res.status(404).json({ error: 'Movie not found' })
  }
})

// We use always the same resource to create a new movie (API REST). No /crate-movie or /add-movie
app.post('/movies', (req, res) => {
  const {
    title,
    year,
    genre,
    director,
    duration,
    poster,
    rate
  } = req.body

  const newMovie = {
    id: crypto.randomUUID(), // Generate a unique ID for the new movie. Universal Unique Identifier (UUID)
    title,
    year,
    genre,
    director,
    duration,
    poster,
    rate: rate ?? 0
  }

  movies.push()// This in not REST, because we are not using a database (we are saving the data in memory)

  res.status(201).json(newMovie) // Return the created movie with a 201 status code
})

app.listen(1234, () => {
  console.log('Server is running on port 1234')
})
