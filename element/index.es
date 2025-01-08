// http://2ality.com/2013/09/window.html
// http://tobyho.com/2013/03/13/window-prop-vs-global-var

const Element = tag => (

//      const constructor =// swizzle
//        typeof tag === 'string'
//    //    ? HTMLCustomElement
//    //    : HTMLElement

        //https://gist.github.com/allenwb/53927e46b31564168a1d
        // https://github.com/w3c/webcomponents/issues/587#issuecomment-271031208
        // https://github.com/w3c/webcomponents/issues/587#issuecomment-254017839

      Element => // https://en.wikipedia.org/wiki/Higher-order_function
        customElements.define
          ( tag + '', Custom (Element) )

// Assign `window.Element.prototype` in case of feature checking on `Element`
//  E.prototype = Element.prototype
//  return E
)
