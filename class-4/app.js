import express from 'express'
import { router } from './routes/movies.js'
import { corsMiddleware } from './middleware/cors.js'

const app = express()
app.use(express.json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/movies', router)

app.listen(1234, () => {
  console.log('Server is running on port 1234')
})
