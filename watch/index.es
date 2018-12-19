const
  { DIRECTORY: path, BROWSER_PORT }
    = process.env

, test     = `$SNUGGSI/bin/test`
, bundle   = `$SNUGGSI/bin/bundle`
, shrink   = `$SNUGGSI/bin/shrink`
, publish  = `$SNUGGSI/bin/publish`
, transpile= `$SNUGGSI/bin/transpile`
, clear    = `$SNUGGSI/tput reset` // htps://askubuntu.com/questions/25077/how-to-really-clear-the-terminal
, message  = `\n Watching 👉  ${path}🔎 👀 \n`
, echo     = `printf "${message}" && echo "Last Update $(date)"`
, validate = 'bin/validate-weight || true'

, exec = require ('child_process').exec

, reload =
    BROWSER_PORT
      && `$SNUGGSI/node_modules/.bin/browser-sync reload --port=$BROWSER_PORT`

, command =
[] //  [ bundle, transpile, shrink, publish, reload, clear, echo, test, validate ]
      .filter (Boolean)
      .join ` && `


console.warn (process.env)

let times = 0

require ('fs').watch (path, { recursive: true },

  // Vim causes tmp file update `4913`
  // https://github.com/bevry/watchr/issues/33
  // specific to .es files. Can remove line for all files

(event, file) => {

  const predicate =
    /^dist/.test (file) ||
    /^public/.test (file) ||
  !!! /\.(test|html|es|js|css)$/.test (file)

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
