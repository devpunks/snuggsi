class TokenList {

  constructor (node) {

    this
      .sift (node)
      .map  (this.tokenize, this)
  }

  tokenize (node) {

    const
      insert = node =>
        symbol =>
          (this [symbol] = this [symbol] || []).push (node)

    void (node.text = node.textContent)
      .match (/([^{]*?)(\w|#)(?=\})/g)
      .map (insert (node))
  }

  sift (node) {

    const
      nodes = []
    , expression = /{(\w+|#)}/

    , visit = node =>
        node.nodeType === Node.TEXT_NODE
          ? TEXT_NODE (node)
          : ELEMENT_NODE (node.attributes)
        && NodeFilter.FILTER_REJECT // We don't need 'em

    , TEXT_NODE = node =>
        expression.test (node.textContent)
          && nodes.push (node)

    , ELEMENT_NODE = attrs =>
        []
          .slice
          .call (attrs)
          .map  (attr => expression.test (attr.value) && nodes.push (attr))

    , walker =
        document.createNodeIterator
          (node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, visit, null)
          // by default breaks on template YAY! 🎉

    while (walker.nextNode ()) 0 // Walk all nodes and do nothing.

    return nodes
  }

  bind (context) {

    const
      keys = Object.keys (this)

    , reset = symbol =>
        this [symbol].map
          (node => (node.textContent = node.text) && symbol)

    , replace =
        (symbol, token = '{'+symbol+'}') =>
          item =>
            (item.textContent = item.textContent.replace (token, context [symbol]))

    keys.map (reset)

    for (let symbol in this)
      this [symbol]
        .map (replace (symbol))
  }

//zip (...elements) {
//  const
//    lock = (zipper, row) => [...zipper, ...row]
//  , pair = teeth => // http://english.stackexchange.com/questions/121601/pair-or-couple
//      (tooth, position) => // thunk
//        [tooth, teeth [position]]

//  return elements [1]
//    .map (pair (elements [0]))
//    .reduce (lock)
//}

//slice (text, tokens = []) {
//  const
//    match    = /({\w+})/g // stored regex is faster https://jsperf.com/regexp-indexof-perf
//  , replace  = token => (collect (token), '✂️')
//  , collect  = token => tokens.push (token)
//  , sections = text
//      .replace (match, replace)
//        .split ('✂️')

//  return zip (tokens, sections)
//        .map (element => element && new Text (element))
//}
}

