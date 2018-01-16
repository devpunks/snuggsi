const
  { readFileSync: read }
    = require ('fs')

module.exports = function (source, buffer = []) {

  source
    .on ('data', data => buffer.push (data))
    .on ('end', _ => console.warn ('ended', buffer))
}
