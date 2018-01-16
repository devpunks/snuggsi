const
  { readFileSync: read }
    = require ('fs')

module.exports = (source, promise = new Promise, buffer = []) => {

  source
    .on ('data', data => buffer.push (data))
    .on ('end', _ => promise.resolve (buffer.join ``))

  return promise
}
