const
  proxy =
    `http://localhost:${process.env.PORT}`

, port = // for browsersync
    Number.parseInt // (8000 - 9000)
      (8000 + (Math.random () * 1000))

module.exports = {

  proxy
, "port": `${process.env.BROWSER_PORT}`
, "files": [] // ['public'] since we explicitly fire reload from watch
, "startPath": "/"
, "logPrefix": "snuggsiツ"
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
