const HTMLLinkElement = function

  // http://w3c.github.io/webcomponents/spec/imports/#h-interface-import

(tag) {

  const
    target = document.querySelector // use CSS :any ?
      ('link[href*='+tag+'][rel=import]')

  , register = (event, handler) => // https://github.com/webcomponents/html-imports#htmlimports
      HTMLImports
        && !!! HTMLImports.useNative
          ? HTMLImports.whenReady
              ( _ => handler ({ target }) ) // eww

          : target.addEventListener (event, handler)

  return target

//Object
//  .defineProperties (target, {

//    'addEventListener': {
//      writable: false,

//      value: function (event, handler) {
//        !!! target
//          ? handler  ({ target })
//          : register (event, handler)
//      }
//    }

// TODO: definition for onerror
//    , 'onerror':
//        { set (handler) {} }
//  })

//return target
}

