/*
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 */

  const
    port    = process.env.PORT
  , proxy   = `http://localhost:${port}`
  , browser = require ('../middleware/browser.es')

  console.log ('PROXY', proxy)

  module.exports = {

    "ui": false,
    "port": 8080,
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
