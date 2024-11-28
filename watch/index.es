#!/usr/bin/env node

// https://stackoverflow.com/q/12978924/fs-watch-fired-twice-when-i-change-the-watched-file

const
  { debounce, throttle } = require ('./govern')
, { SNUGGSI, BROWSER_PORT, DIRECTORY: path } = process.env
, clear = `tput reset` // htps://askubuntu.com/q/25077/how-to-really-clear-the-terminal
, test = `index.es.test`
, message = ` 👉  ${path}🔎 👀 \n`
, bundle = `${SNUGGSI}/bin/bundle`
, shrink = `${SNUGGSI}/bin/shrink`
, validate = `${SNUGGSI}/bin/validate`
, transpile = `${SNUGGSI}/bin/transpile`
, exec  = require ('child_process').exec
, watch = require('../package.json')['watch']
, echo = `printf "${message}" && echo "Last Update $(date)"`
, reload = BROWSER_PORT
    && `$SNUGGSI/node_modules/.bin/browser-sync reload --port=$BROWSER_PORT`
, command = [ bundle, transpile, shrink, reload ]
    .filter( Boolean )
    .join ` && `

watch.forEach (path => {
  const
    message = ` 👉  ${path}🔎 👀 \n`
  , test = `node ${path}/index.es.test`
  , runner = [ test, command ].join ` && `
  , echo = `printf "${message}" && echo "Last Update $(date)"`
    // caveats
    //   - https://nodejs.org/docs/latest/api/fs.html#fs_caveats
    //   - https://github.com/nodejs/node-v0.x-archive/issues/2054#issuecomment-8686322
    //   - https://stackoverflow.com/questions/12978924/fs-watch-fired-twice-when-i-change-the-watched-file
    // https://github.com/nodejs/node/issues/21643
  , callback = (event, file) => {
      const
        start = new Date
      , predicate =
          // /^dist/.test (file) ||
          // /^public/.test (file) ||
          // Vim causes tmp file update `4913`
          ( file !== 4913 ) // https://github.com/b4winckler/vim/blob/master/src/fileio.c#L3704
            && /\.(test|es|js|css|html)$/
              .test (file)

      predicate && exec (runner, (error, stdout, stderr) =>
        error
          ? console.error (`exec error: ${error}`
            , 'The Error >>>>> ', stderr )
          : console.log (`${stdout} \n\n`
            , `Execution time: ${ (new Date) - start }ms` )
      ) // exec
    } // callback

  require ('fs').watch
    // https://nodejs.org/docs/latest/api/fs.html#fswatchfilename-options-listener
    (path, { recursive: true }, debounce( callback ))

  console.log('👁️  Watching 📂', `${path}/♾️`)
}) // forEach
