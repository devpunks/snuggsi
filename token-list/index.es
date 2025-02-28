class TokenList { // TODO: Rename to Symbols

  constructor (node) {
    const
      scan = node =>
        node.attributes && [].slice
           .call (node.attributes)
           .map  (visit)
        || visit (node)

    // Syntax Analyzer (Parser)
    , visit = node =>
        // https://en.wikipedia.org/wiki/Lexical_analysis#Token
        /{(\w+|#)}/.test (node.textContent)
          && (node.text = node.textContent) // cache
              // https://en.wikipedia.org/wiki/Identifier_(computer_languages)
              .match (/[^{]+(?=})/g) // rule
              // TODO: convert `symbol` to `token`
              // https://en.wikipedia.org/wiki/Symbol_table
              .map   (symbol => (this [symbol] || (this [symbol] = [])).push (node))

    // Lexical Analyzer (Scanner)
    , scanner = // https://en.wikipedia.org/wiki/Semantic_analysis_(compilers)
        // https://en.wikipedia.org/wiki/Parsing#Parser
        document.createNodeIterator // .createTreeWalker
          // https://en.wikipedia.org/wiki/Top-down_parsing
          (node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, scan, null)

    // https://en.wikipedia.org/wiki/One-pass_compiler
    while (scanner.nextNode ()) null // Walk all nodes and do nothing.
  } // constructor

  bind (context) {
    const
      tokenize = token => node =>
        (node.textContent = node.text
          .split ('{'+token+'}')
          .join  (context [token]))

    for (let token in this)
      console.log('context', token)
//  for (let token in this)
//    token != 'bind' // current method
//      && this [token].map // more than one occurrence
//        (node => (node.textContent = node.text)) // memoize

    for (let token in this)
      token != 'bind' // current method
        && this [token].map // more than one occurrence
          (tokenize (token))
  } // bind

} // TokenList

