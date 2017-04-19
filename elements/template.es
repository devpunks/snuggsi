// INTERESTING! Converting `Template` to a class increases size by ~16 octets

//class Template {

//  constructor ( name = 'snuggsi' ) {
//    return Object.assign (this.factory (...name), { bind: this.bind })
//  }

//  bind (context) {
//    context = Array.isArray (context) ? context : [context]
//  }

//  factory (name) {
//    return (
//      document.querySelector ('template[name='+name+']').cloneNode (true)
//        || document.createElement ('template'))
//  }
//}

const Template = function ( name = 'snuggsi' ) {
  this.dependents = []

  return Object.assign
    (document.querySelector ('template[name='+name+']'), { bind } )

  function tokenized (template) {
    const
      visit = (node, filter = /({\w+})/g) =>
        filter.exec (node.data) // stored regex is faster https://jsperf.com/regexp-indexof-perf
          && NodeFilter.FILTER_ACCEPT

    , walker = document.createNodeIterator
        (template.content, NodeFilter.SHOW_TEXT, visit)
        // by default breaks on template YAY! 🎉

    let
      node
    , nodes = []

    while (node = walker.nextNode ())
      nodes.push (node)

    return nodes
  }

  function bind (context) {
    this.dependents = this.dependents || []


    context = Array.isArray (context) ? context : [context]

    const
      records   = []
    , dependant = undefined

    while
      (dependent = this.dependents.pop ())
        dependent.remove ()


    for (const item of context) {
      let
        clone  = this.cloneNode (true)
      , tokens = (new TokenList (tokenized (clone) ))

      tokens.bind (item)
      records.push (clone.content)
    }

    records.map
      (function (record) { this.dependents.push (...record.childNodes) }, this)

    this.after (...records)

    return this
  }
}
