const net = require('node:net')

function findAvailablePort (startPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.listen(startPort, () => {
      const port = server.address().port
      server.close(() => {
        resolve(port)
      })
    })
    // Handle the case where the port is already in use
    // server.on is an event emitter
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findAvailablePort(0).then(resolve).catch(reject)
      } else {
        reject(err)
      }
    })
  })
}

module.exports = { findAvailablePort }
