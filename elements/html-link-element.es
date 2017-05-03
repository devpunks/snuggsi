const HTMLLinkElement = function (tag) {

  console.log ('before')
document
  .addEventListener
    ('HTMLImportsLoaded', function () {  console.log ({ target: 'foo' })})
  console.log ('after')

  const
    link = document
      .querySelector // use CSS :any ?
        ('link#'+tag+'[rel=import], link[href*='+tag+'][rel=import]')
    || {}

  Object.defineProperty
    (link, 'onload', {

      set (handler) {
  console.log ('link', link.tagName && !!! HTMLImports.useNative)

        link.tagName && !!! HTMLImports.useNative
          ? document.addEventListener
              ('HTMLImportsLoaded', _ => console.log ('wtf')) //handler ({ target: link }))
          : handler ({ target: link })
      }
    })

  return link
}

