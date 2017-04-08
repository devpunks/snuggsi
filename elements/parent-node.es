class TokenList {

  constructor (nodes) {
    const
      symbolize = symbol =>
        symbol.match (/(\w+)/g) [0]

    , insert = token =>
        symbol => this [symbol] = token

    , tokenize = token =>
        token.textContent.match (/{(\w+)}/g)
          .map (symbolize)
          .map (insert (token))

    , textify = node =>
        (node.text = node.data) && node

    nodes
      .map (textify)
      .map (tokenize)
  }


  bind (context, node) {

    for (const property in this)
      node = this [property]
      , node.data = node.text

    for (const property in this)
      node = this [property]
      , node.data = node.data
        .replace ('{'+property+'}', context [property])
  }
}

const ParentNode = Node =>
  // DOM Levels
  // (https://developer.mozilla.org/fr/docs/DOM_Levels)
  //
  // Living Standard HTML5 ParentNode
  // https://dom.spec.whatwg.org/#parentnode
  //
  // MDN ParentNode
  // https://developer.mozilla.org/en-US/docs/Web/API/ParentNode
  //
  // ElementTraversal interface
  // https://www.w3.org/TR/ElementTraversal/#interface-elementTraversal

(class extends Node {
  // http://jsfiddle.net/zaqtg/10
  // https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
  // https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator
  // https://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html
  // https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter
  // NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT

  selectAll (selector) {
    return this.listenable
      (this.querySelectorAll (selector))
  }

  // watch out for clobbering `HTMLInputElement.select ()`
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
  select (selector) { return this.selectAll (selector) [0] }

  get texts () {
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

  get tokens () {
    return this._tokens
      || (this._tokens = new TokenList (this.texts))
  }
})

//function comb
//  // ElementTraversal interface
//  // https://www.w3.org/TR/ElementTraversal/#interface-elementTraversal
//
//(parent) {
//  if (parent.hasChildNodes())
//    for (let node = parent.firstChild; node; node = node.nextSibling)
//      comb (node)
//}
