const fork = require ('child_process').fork

var fs = require (`fs`)
  , dir = `./`

fs.watch (dir, (event, file) => {

  console.log (file)
  if (`index.es` !== file) return

  var child = fork ('./index.test.es', [], {stdio: 'pipe'})

  child.on('data', data => console.log (data))
})

console.log (`Watching tests from => ${dir}`)
