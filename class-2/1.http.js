const http = require('node:http')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.statusCode = 200
    res.setHeader('X-Powered-By', 'Node.js')
    res.end('<p>El inicio</p>')
  } else if (req.url === '/uva') {
    res.statusCode = 200
    res.end('<h1>Uva</h1>')
  } else {
    res.statusCode = 404
    res.end('Not Found')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`Server is running on port http://localhost:${desiredPort}`)
})
