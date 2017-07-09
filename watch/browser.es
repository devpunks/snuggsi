/*
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 */

module.exports = {

  "ui": false,
  "port": 3001,
  "files": [], // ['public'] since we explicitly fire reload from watch
  "startPath": "/index.html",

  "reloadDelay": 2,
  "logPrefix": "snuggsiツ",
  "proxy": 'http://localhost:3000',

  "watchOptions": {
    ignored: '',
    ignoreInitial: true
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
}
