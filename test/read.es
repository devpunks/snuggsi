const
  { readFileSync: read }
    = require ('fs')

module.exports = function (source, buffer = []) {

  source
    .on ('data', buffer.push)
    .on ('end', _ => console.warn ('ended'))
}
