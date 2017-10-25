void (_ => {


  let
    process = (link, nodes) => {
      let anchor = link.nextSibling

      for (let node of nodes) {
        let
          // https://chromium.googlesource.com/chromium/src.git/+/0661feafc9a84f03b04dd3719b8aaa255dfaec63/third_party/WebKit/Source/core/loader/LinkLoader.cpp
          as = node.getAttribute ('as')

        , clone =
            document.createElement
              ('script' == as ? as : node.localName)

        void

        ['as', 'id', 'src', 'href', 'textContent', 'rel'/* , media */]
          .map (attr => node [attr] && attr in clone && (clone [attr] = node [attr]))

        // use rel = 'preload stylesheet' for async
        // or use media=snuggsi => media || 'all' trick
        // loadCSS - https://github.com/filamentgroup/loadCSS
        // http://keithclark.co.uk/articles/loading-css-without-blocking-render
        'style' == as
        // https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/#markup-based-async-loader
          && (clone.rel = 'stylesheet')

        'script' == as // smelly
          && (clone.src = clone.href)

        link
          .parentNode
          .insertBefore (clone, anchor)
      }
    }

  // https://bugs.webkit.org/show_bug.cgi?id=38995
  // https://www.w3.org/TR/html5/document-metadata.html#the-link-element
  // https://github.com/w3c/preload/pull/40
  , onload = link =>
      function () {
        console.warn (link.id)

        let
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
    .call (document.querySelectorAll ('[rel^=pre][id~="-"]'))
    .map  (load)


  // XHR Specs
  // https://xhr.spec.whatwg.org
  // Progress events
  // https://xhr.spec.whatwg.org/#interface-progressevent
  // Loader - https://trac.webkit.org/browser/trunk/WebCore/loader/loader.cpp
  function load (link) {
    let xhr = new XMLHttpRequest

    xhr.onload = onload (link)
    // progress events won't fire unless defining before open
    xhr.open ('GET', link.href)
    xhr.responseType = 'document'
    // Max requests
    xhr.send ()
  }

  //create an observer instance
  // Can always default to DOMContentLoaded
  // https://bugs.webkit.org/show_bug.cgi?id=38995#c26
  (new MutationObserver ( mutations => {

    for (let mutation of mutations)
      for (let node of mutation.addedNodes)
           /^p/.test (node.rel)
             && /\-/.test (node.id)
             && load (node)

        ,

        !! /\-/.test (node.localName)
    && console.warn (node)

//          && (link = document.querySelector ('#'+node.localName))
//          && link.content
//          && stamp.call (node, link.content)
//          && customElements.upgrade (node)
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

