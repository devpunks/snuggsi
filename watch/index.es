module.exports = require ('./browser.es')

const
  path = './'

, BROWSER_PORT =
    process.env.BROWSER_PORT

, test     = 'bin/test'
, bundle   = 'bin/bundle'
, shrink   = 'bin/shrink'
, publish  = 'bin/publish'
, transpile= 'bin/transpile'
, clear    = 'tput reset' // htps://askubuntu.com/questions/25077/how-to-really-clear-the-terminal
, message  = `\n Watching => ${path}🔎 👀 \n`
, echo     = `printf "${message}" && echo "Last Update $(date)"`
, validate = 'bin/validate-weight || true'

, exec = require ('child_process').exec

, reload =
    BROWSER_PORT
      && './node_modules/.bin/browser-sync reload --port='
        + BROWSER_PORT

, command =
    [ bundle, transpile, shrink, publish, reload, clear, echo, test, validate ]
      .filter (Boolean)
      .join ` && `

let times = 0

require ('fs').watch (path, { recursive: true },

  // Vim causes tmp file update `4913`
  // https://github.com/bevry/watchr/issues/33
  // specific to .es files. Can remove line for all files

(event, file) => {

  const predicate =
    /^dist/.test (file) ||
    /^public/.test (file) ||
  !!! /\.(html|es|css)$/.test (file)

  if ( predicate ) return

  let start = new Date

  exec (command, (error, stdout, stderr) => {
    const
      now = (new Date) - start
    , output = `${stdout} \n\n Feedback (${++times}) Execution time: ${now}ms`

    error
      ? console.error (`exec error: ${error}`)
      : console.log (output, stderr)
  })
})

console.log (command)
console.log (message)

