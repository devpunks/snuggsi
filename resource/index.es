const
  Base = path =>
    Boolean (... (path = [].concat (path)))
      ? require (`${path}/index.es`)
      : class {}
;

module.exports = path => {

return new class extends Base (path) {

  constructor () { super ()
    console.warn ('Constructing extension', path)
  }

//options (context)
//  // should be done by CORS
//  { context.status = 200 }

  head (context)
    { context.status = 200 }

  get (context)
    { context.status = 200 }

//purge (context)
//  // http://restcookbook.com/Basics/caching/
//  { context.status = 202 }
}
}
