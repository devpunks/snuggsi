class TokenList {

  constructor (node) {

    const
      textify = node =>
        (node.text = node.textContent, node)

    , tokenize = token =>
        // String.prototype.match returns ALL capture groups!!!
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
        token.textContent
          .match (/{\w+}/g)
            .map (symbolize)
            .map (insert (token))

    , symbolize = symbol =>
        symbol.match (/(\w+)/g) [0]

    , insert = token =>
        symbol =>
          (this [symbol] = this [symbol] || [])
            && this [symbol].push (token)

    this
      .sift (node)
      .map  (textify)
      .map  (tokenize)
  }

  sift (node) {

    const
      nodes = []

    , visit = node =>
        node.nodeType === Node.TEXT_NODE
          ? (TEXT_NODE (node) && NodeFilter.FILTER_ACCEPT)
          : ELEMENT_NODE (node.attributes) && NodeFilter.FILTER_REJECT

    , TEXT_NODE = node =>
        (node.nodeType === Node.TEXT_NODE)
          && /{\w+}/.test (node.textContent)

    , ELEMENT_NODE = attributes =>
        Array
          .from (attributes || [])
          .filter (attr => /{\w+}/g.test (attr.textContent))
          .map (attribute => nodes.push (attribute))

    , walker =
        document.createNodeIterator
          (node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, visit)
          // by default breaks on template YAY! 🎉

    while
      (node = walker.nextNode ())
        nodes.push (node)

    return nodes
  }

  bind (context, node) {

    const
      prepare = symbol =>
        this [symbol]
          .map (token => token.textContent = token.text)
        && symbol

    , replace = symbol =>
        this [symbol]
          .map (replacement (symbol))

    , replacement = symbol =>
        item =>
          item.textContent = item.textContent
            .replace ('{'+symbol+'}', context [symbol])

    Object
      .keys (this)
      .map  (prepare)
      .map  (replace)

    return this
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
//     .filter (element => element)
//        .map (element => new Text (element))
//}
}

