const HTMLLinkElement = function (tag) {
  console.log (tag)

  const
    link =
      document
        .querySelector // use CSS :any ?
          ('link#'+tag+'[rel=import], link[href*='+tag+'][rel=import]')
    || {}

  Object
    .defineProperty (link, 'onimport', {
      set (handler) {

        !!! HTMLImports.useNative
          ? !!! console.warn ('foo') &&

      document.addEventListener
            ('HTMLImportsLoaded', _ => handler ({ target: link }))
          : handler ({ target: link })
      }
    })

  return link
}

