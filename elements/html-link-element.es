const HTMLLinkElement = function

  // http://w3c.github.io/webcomponents/spec/imports/#h-interface-import

(tag) {

  const
    evt = new Event ('load')

  , target = document.querySelector // use CSS :any ?
      ('link[href*='+tag+'][rel=import]')

  // https://github.com/webcomponents/html-imports#htmlimports
  ;(evt.target = target)
    && window.HTMLImports
    && !!! window.HTMLImports.useNative
    && HTMLImports.whenReady ( _ => target.dispatchEvent (evt) ) // eww

  return target
}

