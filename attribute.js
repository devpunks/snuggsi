// DOM Level 1 Attr
// (https://developer.mozilla.org/fr/docs/DOM_Levels)
//
// WHATWG
// https://dom.spec.whatwg.org/#interface-attr
// https://dom.spec.whatwg.org/#dom-document-createattribute
//
// MDN
// https://developer.mozilla.org/en-US/docs/Web/API/Attr
// https://developer.mozilla.org/en-US/docs/Web/API/Document/createAttribute
//
// Warning: In DOM Core 1, 2 and 3, Attr inherited from Node.
// This is no longer the case in DOM4.
// In order to bring the implementation of Attr up to specification,
// work is underway to change it to no longer inherit from Node.
// You should not be using any Node properties or methods on Attr objects.
//
// Starting in Gecko 7.0 (Firefox 7.0 / Thunderbird 7.0 / SeaMonkey 2.4),
// the ones that are going to be removed output warning messages to the console.
// You should revise your code accordingly.
// See Deprecated properties and methods for a complete list.

class Attribute extends Attr {
  constructor (name) {
    return document.createAttribute (name)

    return new Proxy(
      document.createAttribute (name),
      {
        get (subject, name, self) {
          return subject [name]
        },

        set (subject, name, value, self) {
          subject [name] = value
        }
      }
    )
  }
}

window.attr = new Attribute ('id')


console.warn ('Attribute')
console.log ('Attribute', attr.name)
console.log ('Value', attr.value)
attr.value = 'snuggsi'
console.log ('Value', attr.value)

let h1 = document.querySelector ('h1')
//console.log ('IsID', attr.isId)
  h1.setAttributeNode (attr)
//console.log ('IsID', attr.isId)
console.log ('Element', attr.ownerElement)
