const express = require('express')
const server = express()

server.get('/', async (req, res) => {
  try {
    const response = await PythonConnector.server(req.query.username)
    res.status(200).send(response)
  } catch (e) {
    console.log(`error in ${req.url}`, e)
    res.status(404).json({ message: '404' })
  }
})

server.listen(3000, console.log('up and running'))

class PythonConnector {
  static server(username) {
    if (!PythonConnector.connected) {
      console.log(
        'PythonConnector - making a new connection to the Python layer.'
      )
      PythonConnector.process = require('child_process').spawn('python3', [
        '-u',
        './app.py',
        username
      ])
      PythonConnector.process.stdout.on('data', function(data) {
        console.info('python', data.toString())
      })
      PythonConnector.process.stderr.on('data', function(data) {
        console.error('python', data.toString())
      })

      PythonConnector.connected = true
    }
    return PythonConnector
  }
}
