module.exports = require ('./watch.browser.es')

const
  dir     = './'
, bundle  = 'npm run bundle'
, copy    = 'npm run copy'
, reload  = './node_modules/.bin/browser-sync reload --port 8181'
, clear   = 'tput reset' // htps://askubuntu.com/questions/25077/how-to-really-clear-the-terminal
, message = `\n Watching => ${dir}🔎 👀 \n`
, echo    = `printf "${message}" && echo "Last Update $(date)"`
, list    = 'ls -al ./dist/*.es'

, exec = require ('child_process').exec
, command = [bundle, copy, reload, clear, echo, list]
     .join (' && ')

require ('fs').watch (dir, { recursive: true },

  // Vim causes tmp file update `4913`
  // https://github.com/bevry/watchr/issues/33
  // specific to .es files. Can remove line for all files

(event, file) => {

  const
    predicate =
      /^dist/.test (file) ||
      /^public/.test (file) ||
    !!! /\.(html|es)$/.test (file)

  if ( predicate ) return

  exec (command, (error, stdout, stderr) => {
      error
        ? console.error (`exec error: ${error}`)
        : console.log (stdout, stderr)
  })
})

console.log (command)
console.log (message)

