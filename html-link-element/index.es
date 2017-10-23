void (_ => {
  // https://bugs.webkit.org/show_bug.cgi?id=38995
  // https://www.w3.org/TR/html5/document-metadata.html#the-link-element
  const onload = link => {
    return /*process*/ function () {
      const
        next =
          link.nextSibling

      , response =
          link.content = this.response

      , reflect = (clone, node) => attr =>
          node [attr]
            && (clone [attr] = node [attr])

      for
        (let node of document.querySelectorAll (link.id))
      //(let node of document.getElementsByTagName (link.id))
          stamp.call
            (node, response.querySelectorAll ('template') [0])


      for (let node of response.querySelectorAll ('style,link,script')) {

        let
          as = node.getAttribute ('as')

        , clone =
            document.createElement (node.localName)


        void ['id', 'src', 'href', 'textContent', 'rel'/* , media */]
          .map (reflect (clone, node))

        // use rel = 'preload stylesheet' for async
        // or use media=snuggsi => media || 'all' trick
        // loadCSS - https://github.com/filamentgroup/loadCSS
        // http://keithclark.co.uk/articles/loading-css-without-blocking-render
        'style' == as
        // https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/#markup-based-async-loader
          && (clone.rel = 'stylesheet')

        link.parentNode.insertBefore (clone, next)

        'script' == as &&
          (link.parentNode.insertBefore
            (document.createElement ('script'), next)
              .src = node.href)
        ;

        /script|test/.test (as)
          || reflect (clone, node)('as')
      }
    }
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

  const added = mutations.map (mutation => mutation.addedNodes)

  for (let mutation of mutations)
    for (let node of mutation.addedNodes) {
      'link' == node.localName // del
         && /^pre/.test (node.rel)
           && /\-/.test (node.id)
             && preload (node)
      ;

      /\-/.test (node.localName)
        && document.getElementById (node.localName).content
        && stamp .call (node, document.querySelectorAll ('#'+node.localName)[0].content.querySelectorAll ('template')[0])
    }
}))

.observe (document.documentElement, { childList: true, subtree: true })



  // Slot stamping
  // https://github.com/w3c/webcomponents/issues/288
  function stamp (template, insert, replacement) {
    template = template.cloneNode (true)

    for (replacement of this.querySelectorAll ('[slot]'))
        (template.content || template)
          .querySelector ('slot[name='+ replacement.getAttribute ('slot') +']')
            .outerHTML = replacement.outerHTML

    this.innerHTML = template.innerHTML
  }

}) ()

