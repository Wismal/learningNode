const express = require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const cors = require('cors') // Import the CORS middleware
// Import the validation functions from the schema file
const { validateMovie, validatePartialMovie } = require('./schema/validateMovies')

const app = express()
app.use(express.json()) // Middleware to parse JSON request bodies
app.use(cors()) // Enable CORS for all routes
app.disable('x-powered-by') // Disable the 'X-Powered-By' header
// Add your frontend URL here

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

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)
  if (result.error) {
    return res.status(400).json({ error: result.error.message })
  }
  const newMovie = {
    id: crypto.randomUUID(), // Generate a unique ID for the new movie. Universal Unique Identifier (UUID)
    ...result.data // Use the validated data from the request body
  }

  movies.push()// This in not REST, because we are not using a database (we are saving the data in memory)

  res.status(201).json(newMovie) // Return the created movie with a 201 status code
})

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params
  const result = validatePartialMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: result.error.message })
  }
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie not found' })
  }
  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }
  movies[movieIndex] = updateMovie // Update the movie in the array
  return res.json(updateMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie not found' })
  }
  movies.splice(movieIndex, 1) // Remove the movie from the array
  res.json({ message: 'Movie deleted successfully' }) // Return a success message
})

app.listen(1234, () => {
  console.log('Server is running on port 1234')
})
