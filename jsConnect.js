const { PythonShell } = require('python-shell')
const message = 'ryanboris'
const options = {
  mode: 'string',
  args: [message]
}

const shell = new PythonShell('../py-connector/app.py', options)

shell.send(message)

shell.on('message', message => {
  console.log(message)
})

shell.end((err, code, signal) => {
  if (err) throw err
  console.log(`The exit code was ${code}`)
  console.log(`The exit signal was ${signal}`)
  console.log('finished code')
  console.log('finished signal')
})
