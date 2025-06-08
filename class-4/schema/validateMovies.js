import { z } from 'zod'

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: z.number().int().min(1900).max(2024),
  duration: z.number().int().min(1).max(600),
  rate: z.number().min(0).max(10).optional({
    message: 'Rate must be a number between 0 and 10'
  }),
  poster: z.string().url(),
  genre: z.array(
    z.enum(['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance']),
    {
      required_error: 'Movie genre is required'
    }
  )
})

function validateMovie (object) {
  return movieSchema.safeParse(object)
}

function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}

export { validateMovie, validatePartialMovie }
