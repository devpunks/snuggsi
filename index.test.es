const { view, assert, test, describe, context } = require('./test')
  // The resulting document's scheme will be a file://
, window = view ( 'index.test.html' )

describe ('scripts', _=> {
  const
    source = window.document.scripts[0].src

  test ('<script> source', _=> {
//  await window.customElements.whenDefined('foo-bar')

    console.log( window.document.documentElement.outerHTML )

    const i = window.document.createNodeIterator(
      window.document.body,
      window.NodeFilter.SHOW_ELEMENT,
      { acceptNode(node) { return node.tagName != 'FOO-BAR' ? window.NodeFilter.FILTER_ACCEPT : window.NodeFilter.FILTER_SKIP } }
    );

    const pars = [];
    let currentNode;

    while ((currentNode = i.nextNode())) { pars.push(currentNode) }

    console.log( pars )

    console.log ( 'body[role]', window.document.body.attributes['role'].textContent )
    console.log ( '#content', window.document.getElementById('content').attributes['id'].textContent )

    let d = window.document.implementation
      .createHTMLDocument('SHAZAAAAMMM!!!')

    console.log( d.documentElement.outerHTML )

    // assert (source === 'https://unpkg.com/snuggsi')
    assert ( /snuggsi/.test ( source ) )
  }) // test
}) // describe

