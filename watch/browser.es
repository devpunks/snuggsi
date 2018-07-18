const
  proxy =
    `http://localhost:${process.env.PORT}`

, { BROWSER_PORT: port }
    = process.env

module.exports = {

  proxy, port

, 'files': []
, 'startPath': '/'
, 'logPrefix': 'snuggsiツ'
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
