const spawn = require ('child_process').spawn
const exec = require ('child_process').execFile
const fork = require ('child_process').fork

var fs = require (`fs`)
  , dir = `./`

fs.watch (dir, (event, file) => {

  console.log (file)
  if (`index.es` !== file) return

  var child = fork ('./index.es', [], {stdio: 'pipe'})

  child.on('data', data => console.log (data))
})

console.log (`Watching tests from => ${dir}`)
