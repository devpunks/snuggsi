const
  { readFileSync: read }
    = require ('fs')

module.exports = (source, buffer = []) => {

  return typeof source === 'string'
    ? reqd (source, encoding)
    : new Promise ((resolve, reject) => {

      source
        .on ('data', data => buffer.push (data))
        .on ('end', _ => resolve (buffer.join ``))
  })
}
