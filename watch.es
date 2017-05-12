const
  dir = './'

, bundle = 'npm run bundle'
, copy   = 'npm run copy'
, clear  = 'tput reset' // htps://askubuntu.com/questions/25077/how-to-really-clear-the-terminal
, reload = './node_modules/.bin/browser-sync reload --port 8181'
, list   = 'ls -al ./dist/*.es'

, echo    = `echo "${message}"`
, message = `\n Watching => ${dir}🔎 👀 \n`
, exec    = require ('child_process').exec
, command = [bundle, copy, clear, reload, echo, list]
    .join (' && ')

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

