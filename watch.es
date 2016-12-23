const fork = require ('child_process').fork

var fs = require (`fs`)
  , dir = `./`

fs.watch (dir, { recursive: true }, (event, file) => {
  if (!file.includes (`index.test.es`)) return

  var child = fork (file, [], {stdio: 'pipe'})

  child.on('data', data => console.log (data))
})

console.log (`Watching tests from => ${dir}`)
