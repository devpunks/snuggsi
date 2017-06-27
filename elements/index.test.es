const
  {test} = require ('tape')

, read = require ('fs').readFileSync

, {JSDOM} = require ('jsdom')

//, html = read (__dir)
, dom = new JSDOM (read (path, 'utf8'))

export function (interface) {
  const path = `${__dirname}/${interface}.html`

  console.log ('woot in path', path)
  console.log (new JSDOM (read (path, 'utf8'))
}
