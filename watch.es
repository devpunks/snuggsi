const spawn = require ('child_process').spawn
const exec = require ('child_process').execFile
const fork = require ('child_process').fork

var fs = require (`fs`)
  , dir = `./`

fs.watch (dir, (event, file) => {

  console.log (file)
  if (`index.es` !== file) return

  fork ('./index.es')

  return

  const test = spawn ('npm -v', [])
  test.stdout.on (`data`, data => console.log (`stdout: ${data}`))
  test.stderr.on (`data`, data => console.log (`stderr: ${data}`))
  test.on (`close`, code => console.log (`child process exited with code ${code}`))
})

console.log (`Watching tests from => ${dir}`)
