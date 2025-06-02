const http = require('node:http')

const server = http.createServer((req, res) => {
  console.log('Request received')
  // Responder y terminar la respuesta
  res.end('Hola preciosita, ¿cómo estás?')
})

server.listen(0, () => {
  console.log(`Server is running on port http://localhost:${server.address().port}`)
})
