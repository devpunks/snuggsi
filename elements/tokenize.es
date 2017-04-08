const Tokenizer = Text =>

(class extends Text {
//      tokens = []
//    , symbol = /({\w+})/

  tokenize () {
    const
      tail = (text, sibling) => // https://en.wikipedia.org/wiki/Tail_call
        (text.after (sibling), sibling)

  //    , sift = text =>  // https://www.merriam-webster.com/dictionary/sift
  //        symbol.exec (text.textContent) // stored regex is faster https://jsperf.com/regexp-indexof-perf
  //          && (tokens [tokens.length] = text)
  //          || text

    for (const match of walked)
      slice (match.textContent)
  //        .map (sift)
        .reduce (tail, match)
      , match.remove ()

    const objectify = tokens =>
      tokens.reduce ( (object, token) =>
        (object [token.textContent.match (/{(.+)}/) [1]]  = token) && object
      , {})
    var obj = objectify (tokens)
    for (const key in obj)
      obj [key].textContent = fragment.constructor [key]

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
})

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

