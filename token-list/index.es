// http://jsfiddle.net/zaqtg/10
// https://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html
//
// TreeWalker
//   - https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
//   - https://github.com/tmpvar/jsdom/pull/1447
//
// NodeIterator -
//   - https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator
//   - https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter
//   - https://github.com/tmpvar/jsdom/blob/master/lib/jsdom/living/traversal/NodeIterator-impl.js

class TokenList {

  constructor (node) {

    const
      visit = node =>
        node.attributes
          && [].slice
               .call (node.attributes)
               .map  (collect)
          || collect (node)

    , collect = node => {
        /{(\w+|#)}/.test (node.textContent)
          && (node.text = node.textContent)
              .match (/[^{]+(?=})/g)
              .map   (symbol => (this [symbol] || (this [symbol] = [])).push (node))
    }

    , walker =
        document.createNodeIterator
          (node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, visit, null)


    while (walker.nextNode ()) null // Walk all nodes and do nothing.
  }


  bind (context) {

    const
    // FOR GOD'S SAKE PLEASE TEST THIS!!!
   // must both run independently not in tandem

      tokenize = symbol => node =>
        (node.textContent
          = node.textContent
          .split ('{'+symbol+'}')
          .join  (context [symbol]))


    for (let symbol in this)
      symbol
        != 'bind'
        && this [symbol]
        .map (node => (node.textContent = node.text) && node)


    for (let symbol in this)
      symbol
        != 'bind'
        && this [symbol]
        // more than one occurrence
        .map (tokenize (symbol))
  }
}

