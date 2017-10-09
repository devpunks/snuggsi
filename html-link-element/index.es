// Preloading - https://w3c.github.io/preload
// Resource Hints - https://www.w3.org/TR/resource-hints
// https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/#push-vs-preload
// http://w3c.github.io/webcomponents/spec/imports/#h-interface-import
// Caching best practices - https://jakearchibald.com/2016/caching-best-practices/
// https://bugs.webkit.org/show_bug.cgi?id=172639
// https://github.com/whatwg/html/pull/616#issuecomment-180018260
// https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12142852/

void (Element => {
  let xhr

  for (let link of document.querySelectorAll ('link[id*="-"]')) {
    (xhr = new XMLHttpRequest)
       .open ('GET', link.href)

    xhr.responseType = 'document'
    xhr.onload = onload
    xhr.link = link
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

