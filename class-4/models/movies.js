import movies from '../movies.json' with { type: 'json' }
import crypto from 'node:crypto'

//Utilizar una clase porque es una buena práctica para encapsular la lógica relacionada con las películas + escalabilidad

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  static async getById ( {id}) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async create ({input}) {
    const newMovie = {
      id: crypto.randomUUID(),
      ...input
    }
    return newMovie

  }

  static async delete ({id}) {
      const movieIndex = movies.findIndex(movie => movie.id === id)
      if (movieIndex === -1) return false

      movies.splice(movieIndex, 1)
      return true
  }

  static async update ({id, input}) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    const updatedMovie = {
      ...movies[movieIndex],
      ...input
    }
    movies[movieIndex] = updatedMovie
    return updatedMovie
  }
}
 