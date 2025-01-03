class TokenList { // TODO: Rename to Symbols

  constructor (node) {
    const
      visit = node =>
        node.attributes && [].slice
           .call (node.attributes)
           .map  (analyze)
        || analyze (node)

    // Syntax Analyzer (Parser)
    , analyze = node => // https://en.wikipedia.org/wiki/Parsing#Parser
        /{(\w+|#)}/.test (node.textContent)
          && (node.text = node.textContent) // cache
              // https://en.wikipedia.org/wiki/Lexical_analysis
              .match (/[^{]+(?=})/g) // rule
              // TODO: convert `symbol` to `token`
              .map   (symbol => (this [symbol] || (this [symbol] = [])).push (node))

    , walker =
        document.createNodeIterator
          (node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, visit, null)

    // Parser
    while (walker.nextNode ()) null // Walk all nodes and do nothing.
  } // constructor


  bind (context) {

    const
      tokenize = token => node =>
        (node.textContent = node.textContent
          .split ('{'+token+'}')
          .join  (context [token]))

    for (let token in this)
      token != 'bind' // current method
        && this [token].map // more than one occurrence
          (node => (node.textContent = node.text)) // memoize

    for (let token in this)
      token != 'bind' // current method
        && this [token].map // more than one occurrence
          (tokenize (token))
  } // bind
} // TokenList

