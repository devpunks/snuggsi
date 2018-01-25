// http://jsfiddle.net/zaqtg/10
// https://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html
//
// TreeWalker
//   - https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
//   - https://github.com/tmpvar/jsdom/pull/1447
//
// NodeIterator -
//   - https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator
//   - https://github.com/tmpvar/jsdom/blob/master/lib/jsdom/living/traversal/NodeIterator-impl.js
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
      this [symbol]
        .map (node => (node.textContent = node.text) && node)


    for (let symbol in this)
      this [symbol]
        // more than one occurrence
        .map (tokenize (symbol))
  }
}

