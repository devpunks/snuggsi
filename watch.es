const
  dir    = './elements'
, clear  = 'tput reset'
    // htps://askubuntu.com/questions/25077/how-to-really-clear-the-terminal
, bundle = 'npm run bundle'
, reload = './node_modules/.bin/browser-sync reload --port 8181'
, minify = 'npm run gcc'
, copy   = 'cp ./dist/snuggsi.min.es ./snuggsi.min.js'
, list   = 'ls -al ./dist/*.es'

, message = `\n Watching => ${dir}🔎 👀 \n`
, echo    = `echo "${message}"`

, exec = require ('child_process').exec
, command = [bundle, reload, minify, copy, clear, echo, list].join (' && ')

require ('fs').watch (dir, { recursive: true },
  (event, file) => {

  // Vim causes tmp file update `4913`
  // https://github.com/bevry/watchr/issues/33
  // specific to .es files. Can remove line for all files
  if ( ! file.match (/\.es$/) ) return

  exec (command, (error, stdout, stderr) => {
      error
        ? console.error (`exec error: ${error}`)
        : console.log (stdout, stderr)
  })
})

console.log (command)
console.log (message)

