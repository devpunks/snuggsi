// Preloading - https://w3c.github.io/preload
// Resource Hints - https://www.w3.org/TR/resource-hints
// https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/#push-vs-preload
// http://w3c.github.io/webcomponents/spec/imports/#h-interface-import
// https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12142852/
// Caching best practices - https://jakearchibald.com/2016/caching-best-practices/
//
//
// Link in body
//
// https://github.com/whatwg/html/commit/179983e9eb99efe417349a40ebb664bd11668ddd
// https://bugs.webkit.org/show_bug.cgi?id=172639
// https://github.com/whatwg/html/pull/616#issuecomment-180018260

void (Element => {
  const xhr = new XMLHttpRequest

  for (let link of document.querySelectorAll ('link[id*="-"]')) {

    xhr.open ('GET', link.href)
    xhr.responseType = 'document'
    xhr.onload       = onload

    // this is kinda smelly!!!
    xhr.link         = link
    xhr.send ()
  }

  function onload () {
    const
      select =
        this
          .response
          .querySelectorAll
          .bind (this.response)

    , link = this.link

    , next = link.nextSibling

    , reflect = (clone, node) => attr =>
        node [attr]
          && (clone [attr] = node [attr])

    for
      (let node of document.querySelectorAll (link.id))
        stamp.call
          (node, select ('template') [0].cloneNode (true))


    for (let node of select ('style,link,script')) {
      let
        as = node.getAttribute ('as')

      , clone =
          document.createElement (node.localName)


      void ['src', 'href', 'textContent', 'rel']
        .map (reflect (clone, node))

      // use rel = 'preload stylesheet' for async
      // or use media=snuggsi => media || 'all' trick
      // loadCSS - https://github.com/filamentgroup/loadCSS
      // http://keithclark.co.uk/articles/loading-css-without-blocking-render
      'style' == as && (clone.rel = 'stylesheet')

      link.parentNode.insertBefore (clone, next)

      'script' == as &&
        (link.parentNode.insertBefore
          (document.createElement ('script'), next)
            .src = node.href)
    }
  }


  function stamp (template, insert, replacement) {

    for (replacement of this.querySelectorAll ('[slot]'))
        (template.content || template).querySelector
          ('slot[name='+ replacement.getAttribute ('slot') +']')
            .outerHTML = replacement.outerHTML

    this.innerHTML = template.innerHTML
  }

}) (window.HTMLLinkElement)

