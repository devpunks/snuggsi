const HTMLLinkElement = function (tag) {
  console.log (tag)

  const
    link =
      document
        .querySelector // use CSS :any ?
          ('link#'+tag+'[rel=import], link[href*='+tag+'][rel=import]')
    || {}

    Object
      .defineProperty (link, 'onload', {

        set (handler) {
          (!!! HTMLImports.useNative) ?
              HTMLImports.whenReady // eww
              // https://github.com/webcomponents/html-imports#htmlimports
              ( _ => handler ({ target: link }) )
          : handler ({ target: link })
        }
      })

  return link
}

