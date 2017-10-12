let
  root   = process.env.PWD
, cache  = require (`read-cache`)
, output = `${__dirname}/public/style.css`

console.log ('root', root)

module.exports = {
  'autoprefixer' :
    { grid: true },

  'postcss-custom-properties' :
    { preserve: true },

  'postcss-easy-import' : {
    prefix: false,
    extensions: ['.sss'],
    // shouldn't `from` be from ./style not ./    ??
    from: `${__dirname}/style.sss`,

    onImport (sources) {
      console.log (`\n✏️  Post-processing styles @`, (new Date).toUTCString ())
      console.log (`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)

      for (var source in sources)
        console.log (`➡️  ${ sources[source] }`)

      global.watchCSS (sources, this.from)

      console.log (`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n`)
      console.log (`⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ \n`)
      console.log (`Bundle ➡️  ${output }`)
    },

    load (file, options) {
       var extension = file.match (/.+(\..{2,3})$/) [1]

       if ( ~~ this.extensions.indexOf (extension)) // leave import right where it is
         return `@import '${file}';`

       return cache (file, `utf-8`)
    }
  }
}
