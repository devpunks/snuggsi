class TokenList {

  constructor (node) {

    const
      visit = node =>
        node.attributes && [].slice
           .call (node.attributes)
           .map  (collect)
        || collect (node)

    , collect = node =>
        /{(\w+|#)}/.test (node.textContent)
          && (node.text = node.textContent)
              .match (/[^{]+(?=})/g)
              .map   (symbol => (this [symbol] || (this [symbol] = [])).push (node))

    , walker =
        document.createNodeIterator
          (node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, visit, null)

    while (walker.nextNode ()) null // Walk all nodes and do nothing.
  }


  bind (context) {

    const
      tokenize = symbol => node =>
        (node.textContent
          = node.textContent
          .split ('{'+symbol+'}')
          .join  (context [symbol]))

    for (let symbol in this)
      symbol != 'bind'
        && this [symbol].map
          (node => (node.textContent = node.text))

    for (let symbol in this)
      symbol != 'bind'
        && this [symbol].map
          (tokenize (symbol)) // more than one occurrence
  }
}

