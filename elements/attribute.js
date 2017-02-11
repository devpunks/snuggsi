// DOM Levels
// (https://developer.mozilla.org/fr/docs/DOM_Levels)
//
// DOM Level 1 Attr
//
// DOM Level 4 Attr
// https://www.w3.org/TR/dom/#interface-attr
//
// WHATWG Attr
// https://dom.spec.whatwg.org/#interface-attr
// https://dom.spec.whatwg.org/#dom-document-createattribute
//
// MDN Attr
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
//  return document.createAttribute (name)

    return new Proxy (
      document.createAttribute (name),
      {
        get (subject, name, self) {
          return subject [name]
        },

        set (subject, name, value, self) {
          console.warn ('setting')
          subject [name] = value
        }
      }
    )
  }
}
