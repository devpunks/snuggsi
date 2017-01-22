// DOM Level 1 Attr
// (https://developer.mozilla.org/fr/docs/DOM_Levels)
//
// WHATWG
//
// MDN
//

class Attributes {
  constructor () {
    console.log (arguments)

//  return new Map
  }
}

console.warn ('Map')

window.attributes = new Attributes
window.pro = Object.getPrototypeOf (attributes)

console.log (pro)
console.warn ('')
