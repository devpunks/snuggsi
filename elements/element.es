const ElementPrototype = window.Element.prototype // see bottom of this file

const Element = tag => {

  const constructor =// swizzle
    typeof tag === 'string'
      ? HTMLCustomElement
      : HTMLElement

    //https://gist.github.com/allenwb/53927e46b31564168a1d
    // https://github.com/w3c/webcomponents/issues/587#issuecomment-271031208
    // https://github.com/w3c/webcomponents/issues/587#issuecomment-254017839

    return Element => // https://en.wikipedia.org/wiki/Higher-order_function
    {

      window.customElements.define
        ( ...  [].concat ( ... [tag]) , Custom (Element))

    }
}

// Assign `window.Element.prototype` in case of feature checking on `Element`
Element.prototype = ElementPrototype
  // http://2ality.com/2013/09/window.html
  // http://tobyho.com/2013/03/13/window-prop-vs-global-var
  // https://github.com/webcomponents/webcomponentsjs/blob/master/webcomponents-es5-loader.js#L19

