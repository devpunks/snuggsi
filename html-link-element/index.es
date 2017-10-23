void (_ => {


  const
    process = (link, nodes) => {
      let next = link.nextSibling

      for (let node of nodes) {
        let
          // https://chromium.googlesource.com/chromium/src.git/+/0661feafc9a84f03b04dd3719b8aaa255dfaec63/third_party/WebKit/Source/core/loader/LinkLoader.cpp
          as = node.getAttribute ('as')

        , clone =
            document.createElement (node.localName)


        void ['id', 'src', 'href', 'textContent', 'rel'/* , media */]
          .map (attr => clone [attr] = node [attr])

        // use rel = 'preload stylesheet' for async
        // or use media=snuggsi => media || 'all' trick
        // loadCSS - https://github.com/filamentgroup/loadCSS
        // http://keithclark.co.uk/articles/loading-css-without-blocking-render
        'style' == as &&
        // https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/#markup-based-async-loader
          (clone.rel = 'stylesheet')

        link.parentNode.insertBefore (clone, next)

        'script' == as &&
          (link.parentNode.insertBefore
            (document.createElement ('script'), next)
              .src = node.href)
        ;

        /^sc|st/.test (as) // script | style
          // preserves `as` attribute for link rel preload
          || (clone.as = node.as)
      }
    }

  // https://bugs.webkit.org/show_bug.cgi?id=38995
  // https://www.w3.org/TR/html5/document-metadata.html#the-link-element
  // https://github.com/w3c/preload/pull/40
  , onload = link =>
      function () {
        const
          response =
            this.response

        , template =
            link.content =
               response.querySelector ('template')

        for (let node of document.querySelectorAll (link.id))
        //(let node of document.getElementsByTagName (link.id))
          template && stamp.call (node, template)


        process (link, response.querySelectorAll ('style,link,script'))
      };

  [].slice
    .call (document.querySelectorAll ('link[rel^=pre][id*="-"]'))
    .map  (preload)


  // XHR Specs
  // https://xhr.spec.whatwg.org
  // Progress events
  // https://xhr.spec.whatwg.org/#interface-progressevent
  function preload (link) {

    const xhr = new XMLHttpRequest

    xhr.onload = onload (link)
    // progress events won't fire unless defining before open
    xhr.open ('GET', link.href)
    xhr.responseType = 'document'
    xhr.send ()
  }

  //create an observer instance
  // Can always default to DOMContentLoaded
  // https://bugs.webkit.org/show_bug.cgi?id=38995#c26
  (new MutationObserver ( mutations => {

    for (let mutation of mutations)
      for (let node of mutation.addedNodes) {
           /^p/.test (node.rel)
             && /\-/.test (node.id)
             && preload (node)

        !! /\-/.test (node.localName)
          && (link = document.querySelector ('#'+node.localName))
          && link.content
          && stamp.call (node, link.content)
      }
  }))

  .observe (document.documentElement, { childList: true, subtree: true })


  // Slot stamping
  // https://github.com/w3c/webcomponents/issues/288
  function stamp (template) {
    template = template.cloneNode (true)

    for (let replacement of this.querySelectorAll ('[slot]')) {
      (template.content || template).querySelector
       ('slot[name='+ replacement.getAttribute ('slot') +']')
         .outerHTML = replacement.outerHTML
    }

    this.innerHTML = template.innerHTML
  }

}) ()

