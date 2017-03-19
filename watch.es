const dir  = './public'
    , command = `node --harmony index.es`
    , exec = require ('child_process').exec

require ('fs').watch (dir, { recursive: true },
  (event, file) => {

  // Vim causes tmp file update `4913`
  // https://github.com/bevry/watchr/issues/33
  // specific to .es files. Can remove line for all files
  if ( ! file.match (/\.es$/) ) return

  exec (command,
    (error, stdout, stderr) =>
      error
        ?  console.error (`exec error: ${error}`)
        || console.log (stdout, stderr)
  )
})

console.log (`Watching from => ${dir}🔎 👀 `)
