import { MovieModel } from '../models/movies.js'
import { validateMovie, validatePartialMovie } from '../schema/validateMovies.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) {
      res.json(movie)
    } else {
      res.status(404).json({ error: 'Movie not found' })
    }
  }

  static async create (req, res) {
    const result = validateMovie(req.body)
    if (result.error) {
      return res.status(400).json({ error: result.error.message })
    }
    const newMovie = await MovieModel.create({ input: result.data })
    res.status(201).json(newMovie)
  }

  static async delete (req, res) {
    const { id } = req.params
    const result = await MovieModel.delete({ id })
    if (!result) {
      return res.status(404).json({ error: 'Movie not found' })
    }
    res.json({ message: 'Movie deleted successfully' })
  }

  static async update (req, res) {
    const { id } = req.params
    const result = validatePartialMovie(req.body)
    if (result.error) {
      return res.status(400).json({ error: result.error.message })
    }
    const updateMovie = await MovieModel.update({ id, input: result.data })
    if (!updateMovie) {
      return res.status(404).json({ error: 'Movie not found' })
    }
    return res.json(updateMovie)
  }
}
