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


  function preload () {
    []
      .slice
      .call (document.querySelectorAll ('link[id*="-"]'))
      .map  (load)
  }


  function load (link, xhr) {

    // HTML Imports
    (xhr = new XMLHttpRequest)
      .open ('GET', link.href)

    xhr.responseType = 'document'
    xhr.send ()

    xhr.onload = function () {
      const
        doc = this.responseXML

      , html =
          doc.querySelector
            ('template').innerHTML

      , scripts =
          doc.querySelectorAll ('script')

      void []
        .slice
        .call (document.getElementsByTagName (link.id))
        .map  (element => element.innerHTML = html)

      console.warn ('Done stamping', link.id)

      for (let script of scripts) {
        const
          clone = document.createElement ('script')

        script.src
          && (clone.src = script.src)

        clone.textContent = script.textContent
        document.head.append (clone)
      }
    }
  }

}) (window.HTMLLinkElement)

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

