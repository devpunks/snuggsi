class TokenList {

  constructor (node) {

    const
      textify = node =>
        (node.text = node.data, node)

    , symbolize = symbol =>
        symbol.match (/(\w+)/g) [0]

    , insert = token =>
        symbol => this [symbol] = token

    , tokenize = token =>
        token.textContent
          .match (/{(\w+)}/g)
            .map (symbolize)
            .map (insert (token))

    this.text
      .call (node)
      .map  (textify)
      .map  (tokenize)
  }

  bind (context, node) {
    for (const property in this)
      node = this [property]
      , node.data = node.text

    for (const property in this)
      node = this [property]
      , node.data = node.data
        .replace ('{'+property+'}', context [property])

    return this
  }

  text () {

    console.log ('this', this)
    const
      visit = (node, filter = /({\w+})/g) =>
        filter.exec (node.data) // stored regex is faster https://jsperf.com/regexp-indexof-perf
          && NodeFilter.FILTER_ACCEPT

    , walker = document.createNodeIterator
        (this, NodeFilter.SHOW_TEXT, visit)
        // by default breaks on template YAY! 🎉

    let
      node
    , nodes = []

    while (node = walker.nextNode ())
      nodes.push (node)

    return nodes
  }
}

