const fs = require('node:fs')

const folder = process.argv[2] ?? '.'

fs.readdir(folder, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err)
    return
  }
  files.forEach((file) => {
    console.log(file)
  })
})
