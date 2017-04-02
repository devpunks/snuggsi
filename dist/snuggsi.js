// Usage
//
//  Element `date-calendar`

//  (class extends HTMLElement {
//    constructor () {
//      super ()
//      console.log ('Goin in context', this.context)
//      this.listen ('click', (event) => console.log (event))
//    }

//    connectedCallback () {
//      console.log ('from derived connected')
//    }

//    get baz () { return 'baz' }
//  })


// https://github.com/w3c/webcomponents/issues/587#issuecomment-271031208
// https://github.com/w3c/webcomponents/issues/587#issuecomment-254017839
// Custom elements polyfill
// https://github.com/webcomponents/custom-elements/blob/master/src/custom-elements.js
// Function.name - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name#Examples
// https://developer.mozilla.org/en-US/docs/Web/API/Element
// https://developer.mozilla.org/en-US/docs/Web/API/Element/name

//https://gist.github.com/allenwb/53927e46b31564168a1d

var ElementPrototype = window.Element.prototype

var Element = function (tagName) {
  var tokens = [], len = arguments.length - 1;
  while ( len-- > 0 ) tokens[ len ] = arguments[ len + 1 ];

  if (this instanceof Element) { return new self.Element }

  // tagName = tagName.raw [0] for HTML Sanitization?

  return function Definition (prototype) { // Should this be a class❓❓❓❓

    if ( ! prototype)
      { try { return new (window.customElements.get (tagName)) }
      catch (_) { throw 'Must define custom element \n(i.e. Element `'+tagName+'` (class {})' } }

//    if ( ! new.target) self = this // for `.bind ()`
      if ( ! this instanceof Definition) { self = this } // for `.bind ()`

    // https://github.com/whatwg/html/issues/1704
    var CustomElement = (function (prototype) {
      function CustomElement (context) {
      if ( context === void 0 ) context = self;
 prototype.call (this)
        this.context = new State (context, this.stateChangedCallback)
      }

      if ( prototype ) CustomElement.__proto__ = prototype;
      CustomElement.prototype = Object.create( prototype && prototype.prototype );
      CustomElement.prototype.constructor = CustomElement;

      var prototypeAccessors = { rendered: {},context: {} };
      var staticAccessors = { observedAttributes: {} };

      prototypeAccessors.rendered.get = function () { return this.render () };
      CustomElement.prototype.render = function (selector, context) {
        if ( context === void 0 ) context = this.context;

        var
          node = selector ? this.select (selector) : this
        , template = prototype.prototype.render.call (this, selector) // or a bonafied Template

        context = Array.isArray (context)
          ? context : [context]

        node.innerHTML = context
          .map (function (item) { return tag (template, item); })
          .join ('')
      };

      // watch out for clobbering `HTMLInputElement.select ()`
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
      CustomElement.prototype.select = function (selector) {
        return this.listenable
          ([this.querySelector (selector)])[0]
      };

      CustomElement.prototype.selectAll = function (selector) {
        return this.listenable
          (this.querySelectorAll (selector))
      };

      CustomElement.prototype.listenable = function (nodes) {
        var this$1 = this;

        return Array.prototype.map
          .call (nodes, function (node) { return Object.assign
            (node, {listen: this$1.listen.bind(this$1)}); }) // MUTATES!
      };

      // Event target coparisons
      // https://developer.mozilla.org/en-US/docs/Web/API/Event/Comparison_of_Event_Targets
      // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget
      // https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
      CustomElement.prototype.listen = function (event, listener) {
        if ( listener === void 0 ) listener = this [event];

        this.addEventListener (event, listener)
      };

      prototypeAccessors.context.get = function () { return self };
      prototypeAccessors.context.set = function (context) {
        console.warn ('setting context', context)
        return self = context
        };

      // custom element reactions

      CustomElement.prototype.stateChangedCallback = function (previous, next)
          {
            console.warn ('previous', previous)
            console.warn ('next', next)
          };

      CustomElement.prototype.attributeChangedCallback = function (property, previous, next)
          { console.warn ('['+property+'] ['+previous+'] to ['+next+']') };

      // possibly map this with context
      staticAccessors.observedAttributes.get = function () { return ['id'] };

      CustomElement.prototype.connectedCallback = function () {
        prototype.prototype.connectedCallback.call (this)
      };

      // When element is removed from a shadow-including document
      // http://ryanmorr.com/using-mutation-observers-to-watch-for-element-availability/
      CustomElement.prototype.disconnectedCallback = function () {
       // detach event listeners added on attached
        console.warn ('disconnected', this)
      };

      CustomElement.prototype.adoptedCallback = function () { console.warn ('adopted this', this) };

      Object.defineProperties( CustomElement.prototype, prototypeAccessors );
      Object.defineProperties( CustomElement, staticAccessors );

      return CustomElement;
    }(prototype));

    try { window.customElements.define (tagName, CustomElement) }
    finally { return window.customElements.get (tagName) }
  }
}

// Assign `window.Element.prototype`
// in case of feature checking on `Element`
Element.prototype = window.Element.prototype
  // http://2ality.com/2013/09/window.html
  // http://tobyho.com/2013/03/13/window-prop-vs-global-var/
  // https://github.com/webcomponents/webcomponentsjs/blob/master/webcomponents-es5-loader.js#L19

//Element
//(Element)
//(Element) `data-calendar`
//(Element `data-calendar`)
//Element (`data-calendar`)
//Element ('data-calendar')

//new Element
//(new Element)
//new (Element`date-calendar`)
//(new Element) `date-calendar`
//(new Element `date-calendar`)
//new (Element `date-calendar`)
//new Element (`date-calendar`)

