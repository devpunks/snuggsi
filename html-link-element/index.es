  // http://w3c.github.io/webcomponents/spec/imports/#h-interface-import

// Preloading -
//   - https://w3c.github.io/preload/

// Markup based async loader
// - <link rel="preload" as="style" href="async_style.css" onload="this.rel='stylesheet'"

const HTMLLinkElement = (Element => {

  ('loading' === document.readyState)
    ? document.addEventListener // could this be `.onload = f()` ?
        ('DOMContentLoaded', preload)
    : preload ()

}) (window.HTMLLinkElement)

function preload () {
  []
    .slice
    .call (document.querySelectorAll ('link[id*="-"]'))
    .map  (load)
}

function load (link) {
  const
    xhr = new XMLHttpRequest

  xhr.onload = function () {
    stamp
      (link.id)
      (this.responseXML.querySelector ('template').innerHTML)
  }

  xhr.open ('GET', link.getAttribute ('href'))
  xhr.responseType = 'document'
  xhr.send ()
}

function stamp (name) {
  return template =>
    []
      .slice
      .call (document.getElementsByTagName (name))
      .map  (element => element.innerHTML = template)
}

// see global-event-handlers.es:onconnect

//function mirror (template, insert) {

//  template = template.cloneNode (true)

//  insert = (replacement, name, slot) =>
//    (name = replacement.getAttribute ('slot')) &&

//    (slot = template.content.querySelector ('slot[name='+name+']'))
//       // prefer to use replaceWith however support is sparse
//       // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith
//       // using `Node.parentNode` - https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode
//       // & `Node.replaceChid` - https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild
//       // as is defined in (ancient) W3C DOM Level 1,2,3
//       .parentNode
//       .replaceChild (replacement, slot)

//  for (let replacement of this.selectAll ('[slot]'))
//    insert (replacement)

//  Array
//    .from (template.attributes)

//    // skip swapping attribute if setting exists
//    .filter (attr => !!! this.attributes [attr.name])

//    .map  (attr => this.setAttribute (attr.name, attr.value))

//  this.innerHTML = template.innerHTML
//}

