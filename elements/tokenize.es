function tokenize (fragment) {
  const
    tokens = []

  , tail = (text, sibling) =>
      ( ! text.after (sibling)) && sibling

  // https://www.merriam-webster.com/dictionary/sift
  , sift = text =>
      text.textContent.match (/({\w+})/) && (tokens [tokens.length] = text)
      || text

  for (match of mine (fragment))
    slice (match.textContent)
      .map (sift)
      .reduce (tail, match)

    && match.remove ()

  return tokens

  // deconstruct
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

    // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/after
    // Would like to use children
    // to use Element.insertAdjacentElement ('afterend', text)
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
    // however, text is a Node not an Element
    // WARNING: NO DocumentFragment support
    // https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children#Browser_compatibility
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
    // BENCHMARK: https://jsperf.com/insertadjacenthtml-perf/3
}

function zip
  (...elements) { const zipper = []

  , lock = (zipper, row) => [...zipper, ...row]
  , pair = teeth  => // http://english.stackexchange.com/questions/121601/pair-or-couple
    // thunk
      (tooth, position) => [tooth, teeth [position]]

  return elements [1]
    .map (pair (elements [0]))
    .reduce (lock)
}

function slice
  (text) { const tokens  = []

  , match    = /({\w+})/g
  , replace  = token => collect (token) && '✂️'
  , collect  = token => tokens.push (token)
  , sections = text
      .replace (match, replace)
        .split ('✂️')

  return zip (tokens, sections)
     .filter (element => element)
        .map (element => new Text (element))
}

function mine // https://www.merriam-webster.com/dictionary/comb#h2
// http://jsfiddle.net/zaqtg/10
// http://stackoverflow.com/questions/2579666/getelementsbytagname-equivalent-for-textnodes#answer-2579869
// https://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html
// https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
// https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator
// https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter
// NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT

(head) {
  const nodes = []
  const walker = document.createNodeIterator
      (head, NodeFilter.SHOW_TEXT, visit)
      // by default breaks on template YAY! 🎉

  while (node = walker.nextNode ()) nodes.push (node)
  return nodes
}

const tail = (text, sibling) => ( ! text.after (sibling)) && sibling

function visit (node) {
  return /({\w+})/g.test (node.data)
    && NodeFilter.FILTER_ACCEPT // <😕  is this even necessary?
}

function comb (parent) {
  if (parent.hasChildNodes())
    for (let node = parent.firstChild; node; node = node.nextSibling)
      DOMComb (node)
}
