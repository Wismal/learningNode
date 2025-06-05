const express = require('express')
const app = express()

const port = process.env.PORT ?? 0

app.get('/', (req, res) => {
  // Status is 200 by default, so there is no need to set it explicitly
  // Express detects the content type automatically based on the response
  res.send('<h1>Hello World!</h1>')
})

const server = app.listen(port, () => {
  console.log(`Server is running on port ${server.address().port}`)
})
