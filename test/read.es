const
  { readFileSync: read }
    = require ('fs')

module.exports = (source, buffer = []) => {

  return new Promise ((resolve, reject) => {

    source
      .on ('data', data => buffer.push (data))
      .on ('end', _ => promise.resolve (buffer.join ``))
  })
}
