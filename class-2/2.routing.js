const http = require('node:http')

const jsonDitto = require('./pokemon/ditto.json')

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      if (url === '/') {
        res.statusCode = 200
        res.setHeader('X-Powered-By', 'Node.js')
        res.end('<p>El inicio</p>')
      } else if (url === '/uva') {
        res.statusCode = 200
        res.end('<h1>Uva</h1>')
      } else if (url === '/pokemon/ditto') {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.statusCode = 200
        res.end(JSON.stringify(jsonDitto))
      } else {
        res.statusCode = 404
        res.end('Not Found')
      }
      break

    default:
      res.statusCode = 405
      res.end('Method Not Allowed')
  }
}

const server = http.createServer(processRequest)

server.listen(0, () => {
  console.log(`Server is running on port http://localhost:${server.address().port}`)
})
