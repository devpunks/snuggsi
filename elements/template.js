'use strict'

//class Template extends HTMLTemplateElement {
//  constructor (selector) {
//    console.log (selector)
//    return document.querySelector (selector)
//  }
//}
var Template = function (selector) {
  console.warn ('Foo')
  this [Symbol.species]
    = document.querySelector (selector)

  if ( !(this instanceof Template) )
    return this [Symbol.species]

  this.render = function (collection) {
    console.log ('rendering', collection)

    var templates = new Array
      , fragment  = document.createDocumentFragment ()

    for (var map of collection) {
      let template  = this [Symbol.species].innerHTML
      let html = template

      // ttps://jsperf.com/importnode-vs-clonenode
//    var clone = document.importNode
//      (this [Symbol.species].content, true)
//    var clone = this [Symbol.species].cloneNode(true)

        for (var property in map)
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
          template = template.replace ('${'+property+'}', map [property])

      templates.push (template)
    }

    fragment.innerHTML = templates.join ('')
    console.log ('Frag', fragment)
  }

  return Object.assign
    (document.querySelector (selector), this)
}


var ul = document.querySelector ('ul')
var li = document.createElement ('li')
li.textContent = 'Snuggsiiiiiy'
ul.appendChild (li)

var collection = [{name: 'foo'}, {name: 'bar'}]

void (new Template ('#item'))
  .render (collection)
