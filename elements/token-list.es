class TokenList {

  constructor (node) {

    const
      textify = node =>
        (node.text = node.data, node)

    , symbolize = symbol =>
        symbol.match (/{(\w+)}/g) [0]

    , insert = token =>
        symbol => this [symbol] = token

    , tokenize = token =>
        token.textContent
          .match (/{(\w+)}/g)
            .map (symbolize)
            .map (insert (token))

    this
      .sift (node)
      .map  (textify)
      .map  (tokenize)
  }

  bind (context, node) {
    console.log (context, this ['day'])

    for (const property in this)
      node = this [property]
      , node.data = node.text

    for (const property in this)
      node = this [property]
      , node.data = node.data
          .replace ('{'+property+'}', context [property])

    return this
  }

  sift (node, nodes = []) {

    const
      visit = node =>
        /({\w+})/g.exec (node.data) // stored regex is faster https://jsperf.com/regexp-indexof-perf
          && NodeFilter.FILTER_ACCEPT

    , walker =
        document.createNodeIterator
          (node, NodeFilter.SHOW_TEXT, visit)
          // by default breaks on template YAY! 🎉

    while (node = walker.nextNode ())
      nodes.push (node)

    return nodes
  }


  zip (...elements) { const zipper = []

    , lock = (zipper, row) => [...zipper, ...row]
    , pair = teeth  => // http://english.stackexchange.com/questions/121601/pair-or-couple
      // thunk
        (tooth, position) => [tooth, teeth [position]]

    return elements [1]
      .map (pair (elements [0]))
      .reduce (lock)
  }

  slice (text) { const tokens  = []

   , match     = /({\w+})/g // stored regex is faster https://jsperf.com/regexp-indexof-perf
    , replace  = token => (collect (token), '✂️')
    , collect  = token => tokens.push (token)
    , sections = text
        .replace (match, replace)
          .split ('✂️')

    return zip (tokens, sections)
       .filter (element => element)
          .map (element => new Text (element))
  }
}

