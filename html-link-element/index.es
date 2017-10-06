  // http://w3c.github.io/webcomponents/spec/imports/#h-interface-import

// Preloading -
//   - https://w3c.github.io/preload/

void (Element => {

  const
    preload = () => {
      for (let link of document.querySelectorAll ('link[id*="-"]'))
        load (link)
    }


  console.warn ('\n\nReady State:', document.readyState)

  'loading' == document.readyState

    ? document.addEventListener // could this be `.onload = f()` ?
        ('DOMContentLoaded', preload)

    : preload ()


  function load (link, xhr) {

    console.warn (link.id, 'Load Ready State:', document.readyState);

    // HTML Imports
    (xhr = new XMLHttpRequest)
      .open ('GET', link.href)

    xhr.responseType = 'document'
    xhr.send ()

    xhr.onload = function () {

      console.warn
        (link.id, 'XHR Ready State:', document.readyState, this.response)

      const
        select =
          this
            .response
            .querySelectorAll
            .bind (this.response)

      , next = link.nextSibling

      , template =
          select ('template')[0]

      , clones =
          select ('style,link,script')

      , reflect = (clone, node) => attr =>
          node [attr]
            && (clone [attr] = node [attr])

      for
        (let node of document.querySelectorAll (link.id))
          stamp.call (node, template)


      for (let node of clones) {
        let
          as = node.getAttribute ('as')

        , clone =
            document.createElement (node.localName)


        void ['src', 'href', 'textContent', 'rel', 'as']
          .map (reflect (clone, node))

        'style' == as &&
          (clone.rel += ' stylesheet') // space separated

        link.parentNode.insertBefore (clone, next)

        'script' == as &&
          (link.parentNode.insertBefore
            (document.createElement ('script'), next)
              .src = node.href)
      }
    }
  }


  function stamp (template, insert, replacement) {

console.warn (this, template)

    template = template.cloneNode (true)


    insert = (replacement, name, slot) =>

      (name = replacement.getAttribute ('slot')) &&

      (slot = (template.content || template)
         .querySelector ('slot[name='+name+']'))
           .parentNode
           .replaceChild (replacement, slot)


    for (replacement of this.querySelectorAll ('[slot]'))
      insert (replacement)


    this.innerHTML = template.innerHTML
  }

}) (window.HTMLLinkElement)

