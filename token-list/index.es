  // http://jsfiddle.net/zaqtg/10
  // https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
  // https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator
  // https://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html
  // https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter
  // NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT

class TokenList {

  constructor (node) {

    this
      .sift (node)
      .map  (this.tokenize, this)
  }

  tokenize (node) {

    const
      insert = node => symbol =>
        (this [symbol] = this [symbol] || []).push (node)

    void
      (node.text = node.textContent)
//      .match (/[^{\}]+(?=})/g)
        .match (/[^{]+(?=})/g)
        .map   (insert (node))
  }

  sift (node) {

    const
      nodes = []
    , expression = /{(\w+|#)}/

    , visit = node =>
        node.nodeType === Node.TEXT_NODE
          ? TEXT_NODE (node)
          : ELEMENT_NODE (node.attributes)

    , TEXT_NODE = node =>
        expression.test (node.textContent)
          && nodes.push (node)

    , ELEMENT_NODE = (attrs) =>
        [].slice.call (attrs)
        .map (attr =>
          expression.test (attr.value)
            && nodes.push (attr))

    , walker =
        document.createNodeIterator
          (node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, visit, null)

    while (walker.nextNode ()) 0 // Walk all nodes and do nothing.

    return nodes
  }

  bind (context) {

    const
      reset = symbol =>
        this [symbol].map // more than one occurrence
          (node => node.textContent = node.text)
        && symbol

   // must both run independently not in tandem

    , restore = (symbol) =>
         this [symbol].map (node =>
           (node.textContent =
             node.textContent
               .split ('{'+symbol+'}')
               .join  (context [symbol])))

    Object
      .keys (this)
      .map  (reset)
      .map  (restore)
  }
}

//function slice (text, tokens = []) {
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

