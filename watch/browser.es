/*
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 */

  const
    port = // for browsersync
      Number.parseInt // (8000 - 9000)
        (8000 + (Math.random () * 1000))

  , proxy   = `http://localhost:${process.env.PORT}`
  , browser = require ('../middleware/browser.es')

  module.exports = {

    "ui": false,
    "port": port,
    "files": [], // ['public'] since we explicitly fire reload from watch
    "startPath": "/index.html",

//  "middleware" : [browser],
    "logPrefix": "snuggsiツ",
    "proxy": proxy
  }
/*
    "server": {
      baseDir: './',
      directory: true,
      index: 'examples/index.html',
      routes: {
        'browser-sync-client.js': 'node_modules/browser-sync-client/dist/index.min.js'
      }
    },
*/
