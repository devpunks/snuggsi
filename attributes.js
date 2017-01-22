// DOM Levels
// (https://developer.mozilla.org/fr/docs/DOM_Levels)
//
// DOM Level 1 NamedNodeMap
// (https://developer.mozilla.org/fr/docs/DOM_Levels)
// https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-1780488922
//
// WHATWG NamedNodeMap
//
// TODO: More research on Node.attributes *deprecated😢 *
// https://bugs.chromium.org/p/chromium/issues/detail?id=353104
// https://bugs.chromium.org/p/chromium/issues/attachmentText?aid=156269
//
// MDN NamedNodeMap
// https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap

class Attributes { // extends NamedNodeMap {
  constructor (nodes) {
    this [Symbol.species] = nodes
  }

  // DOM Level 1

  // .getNamedItem - Retrieves a node specified by name.
  //   - `name` DOMString - Name of a node to retrieve
  //
  // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap/getNamedItem
  // https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#method-getNamedItem
  //
  getNamedItem (name) {
    return this [Symbol.species]
      .find (node => name === node.name)
      || null
  }

  // https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-1780488922

  // .setNamedItem - Adds a node using its nodeName attribute.
  //   - `attribute` Attr - Attribute to set by name
  //
  // TODO: MDN Documentation
  // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap/setNamedItem
  // https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#method-getNamedItem
  //
  // TODO: Notify `ownerElement` of attribute update by name
  //       `ownerElement` *deprecated😢 *
  //
  setNamedItem (attribute) {
    let previous = null

    this [Symbol.species]

    // refactor to use getNamedItem
    // https://github.com/jindw/xmldom/commit/409677cfbc0b0c346917ebef83ae65af135c190f#diff-7d1c5d97786fdf9af5446a241d0b6d56R205
      .forEach((node, index) => {
        if (node.nodeName === attribute.nodeName) {
          previous = node
          this [Symbol.species] [index] = attribute
        }
      })

    return previous
  }

  // .removeNamedItem - Removes a node specified by name
  //   - `name` DOMString - Name of a node to remove
  //
  // TODO: MDN Documentation
  // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap/removeNamedItem
  // https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#method-removeNamedItem
  //
  removeNamedItem (name) {
    let removed = null
  
  }

  // .item (index) - Returns the `index`th item in the map.
  //   - `name` DOMString - Name of a node to remove
  //
  // TODO: MDN Documentation
  // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap/removeNamedItem
  // https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#method-removeNamedItem
  //
  item (index) {
    if (index >= this [Symbol.species].length) return null

    return this [Symbol.species] [index]
  }

  // .length - Returns the number of attributes.
  //
  // https://dom.spec.whatwg.org/#dom-namednodemap-length
  // TODO: MDN Documentation
  // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap/length
  // https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#method-removeNamedItem
  //
  get length () { return this [Symbol.species].length }
}
