// http://jsfiddle.net/zaqtg/10
// https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
// https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator
// https://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html
// https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter

class TokenList {

  constructor (node) {

    const
      visit = node =>
        node.attributes
          && [].slice
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
   // must both run independently not in tandem

      tokenize = symbol => node =>
           (node.textContent
             = node.textContent
             .split ('{'+symbol+'}')
             .join  (context [symbol]))

    for (let symbol in this)
      this [symbol].map // more than one occurrence
        (node => node.textContent = node.text)

      && this [symbol].map (tokenize (symbol))
  }
}

