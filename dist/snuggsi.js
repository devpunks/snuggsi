
var this$1 = this;
function tokenize (fragment) {
  var
    tokens = []

  , tail = function (text, sibling) { return (text.after (sibling), sibling); }

  // https://www.merriam-webster.com/dictionary/sift
  , sift = function (text) { return text
      .textContent.match (/({\w+})/)
      && (tokens [tokens.length] = text)
      || text; }

  for (var i = 0, list = mine (fragment); i < list.length; i += 1)
    {
    match = list[i];

    slice (match.textContent)
      .map (sift)
      .reduce (tail, match)
    , match.remove ()
  }

  return tokens

  // deconstruct
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

    // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/after
    // Would like to use children
    // to use Element.insertAdjacentElement ('afterend', text)
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
    // however, text is a Node not an Element
    // WARNING: NO DocumentFragment support
    // https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children#Browser_compatibility
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
    // BENCHMARK: https://jsperf.com/insertadjacenthtml-perf/3
}

function zip
  () {
  var elements = [], len = arguments.length;
  while ( len-- ) elements[ len ] = arguments[ len ];
 var zipper = []

  , lock = function (zipper, row) { return zipper.concat( row); }
  , pair = function (teeth)  { return function (tooth, position) { return [tooth, teeth [position]]; }; }

  return elements [1]
    .map (pair (elements [0]))
    .reduce (lock)
}

function slice
  (text) { var tokens  = []

  , match    = /({\w+})/g
  , replace  = function (token) { return (collect (token), '✂️'); }
  , collect  = function (token) { return tokens.push (token); }
  , sections = text
      .replace (match, replace)
        .split ('✂️')

  return zip (tokens, sections)
     .filter (function (element) { return element; })
        .map (function (element) { return new Text (element); })
}

function mine // https://www.merriam-webster.com/dictionary/comb#h2
// http://jsfiddle.net/zaqtg/10
// http://stackoverflow.com/questions/2579666/getelementsbytagname-equivalent-for-textnodes#answer-2579869
// https://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html
// https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
// https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator
// https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter
// NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT

(head) {
  var nodes = []
  var walker = document.createNodeIterator
      (head, NodeFilter.SHOW_TEXT, visit)
      // by default breaks on template YAY! 🎉

  while (node = walker.nextNode ()) { nodes.push (node) }
  return nodes
}

var tail = function (text, sibling) { return (text.after (sibling), sibling); }

function visit (node) {
  return /({\w+})/g.test (node.data)
    && NodeFilter.FILTER_ACCEPT // <😕  is this even necessary?
}

function comb (parent) {
  if (parent.hasChildNodes())
    { for (var node = parent.firstChild; node; node = node.nextSibling)
      { DOMComb (node) } }
}
var Template = function ( name ) {
  if ( name === void 0 ) name = 'snuggsi';

  return Object.assign (factory.apply (void 0, name), { bind: bind })

  function bind (context) {
    var this$1 = this;

    context = (Array.isArray (context) ? context : [context])

    var
      tokens   = []
    , rendered = context
        .map (function (context) { return this$1.content.cloneNode (true); })
        .map (collect, tokens)

    this.innerHTML = ''
    for (var i = 0, list = rendered; i < list.length; i += 1) {
      var frame = list[i];

      this$1.content.appendChild (frame)
    }

    return context.map(transfer, tokens) && this
  }

  function factory (name) {
    return (
       document.querySelector ('template[name='+name+']').cloneNode (true)
    || document.createElement ('template')
  )}

  function collect (fragment) {
    var objectify = function (tokens) { return tokens.reduce ( function (object, token) { return (object [token.textContent.match (/{(.+)}/) [1]]  = token) && object; }
      , {}); }

    return this.push (objectify (tokenize (fragment))) && fragment
  }

  function transfer (context, index) {
    var this$1 = this;

    for (var property in context) { this$1 [index]
      [property] && (this$1 [index] [property].textContent = context [property]) }
  }
}
// on* events https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Mix-ins
var GlobalEventHandlers = function (EventTarget) { return ((function (EventTarget) {
    function anonymous () {
      EventTarget.apply(this, arguments);
    }

    if ( EventTarget ) anonymous.__proto__ = EventTarget;
    anonymous.prototype = Object.create( EventTarget && EventTarget.prototype );
    anonymous.prototype.constructor = anonymous;

    var staticAccessors = { observedAttributes: {} };

    anonymous.prototype.connectedCallback = function () {
    this.render ()

    void ( EventTarget.prototype.constructor.onconnect
      || EventTarget.prototype.connectedCallback
      || function noop () {}
    ).call (this)
  };

  anonymous.prototype.listenable = function (nodes) {
    var this$1 = this;

    return Array.prototype.map
      .call (nodes, function (node) { return Object.assign
        (node, {listen: this$1.listen.bind(this$1)}); }) // MUTATES!
  };

  // Event target coparisons - https://developer.mozilla.org/en-US/docs/Web/API/Event/Comparison_of_Event_Targets
  anonymous.prototype.listen = function (event, listener)
    {
    if ( listener === void 0 ) listener = this$1 [event];
 this.addEventListener (event, listener) };

  anonymous.prototype.adoptedCallback = function () { console.warn ('adopted this', this) };

  anonymous.prototype.stateChangedCallback = function (previous, next)
      { console.warn ('previous', previous, 'next', next) };

  staticAccessors.observedAttributes.get = function () { return ['id'] };
  anonymous.prototype.attributeChangedCallback = function (property, previous, next)
      { console.warn ('['+property+'] ['+previous+'] to ['+next+']') };

    Object.defineProperties( anonymous, staticAccessors );

    return anonymous;
  }(EventTarget))); }
function upgrade () {
    console.time ()
    var
      reflect = function (p) { return Object.
          getOwnPropertyNames (p); }

    , __prototype = reflect (prototype.prototype)
    , __proto = reflect (prototype)
    , configuration = this.attributes

    console.timeEnd ()
    console.warn (__prototype, __proto, configuration)
}

var ElementPrototype = window.Element.prototype // see bottom of this file

var Element = function
// Custom elements polyfill
// https://github.com/webcomponents/custom-elements/blob/master/src/custom-elements.js
// https://github.com/w3c/webcomponents/issues/587#issuecomment-271031208
// https://github.com/w3c/webcomponents/issues/587#issuecomment-254017839
// Function.name - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name#Examples
//https://gist.github.com/allenwb/53927e46b31564168a1d

(tag) {
  if ( tag === void 0 ) tag = Array.isArray (arguments [0]) ? arguments [0][0] : arguments [0];


  return function // https://en.wikipedia.org/wiki/Higher-order_function
    (prototype, self)
  {
    if ( self === void 0 ) self = ! (this === window) ? this : {};
 // Should this be a class❓❓❓❓

    try
      { if (! prototype) { return new window.customElements.get (tag) } }

    catch (_)
      { throw 'Must define custom element \n(i.e. Element `'+tag+'` (class {})' }

    var HTMLCustomElement = (function (superclass) {
      function HTMLCustomElement () { superclass.call (this)
        this.context = self //new State (self, this.stateChangedCallback)
        superclass.prototype.initialize, superclass.prototype.initialize.call (this)
      }

      if ( superclass ) HTMLCustomElement.__proto__ = superclass;
      HTMLCustomElement.prototype = Object.create( superclass && superclass.prototype );
      HTMLCustomElement.prototype.constructor = HTMLCustomElement;

      var prototypeAccessors = { context: {},templates: {} };

      prototypeAccessors.context.get = function ()        { return self };
      prototypeAccessors.context.set = function (context) { return self = context };

      prototypeAccessors.templates.get = function () { return this.selectAll ('template') };

      HTMLCustomElement.prototype.render = function (selector) {
        var
          node     = selector ? this.select (selector) : this
        , template = superclass.prototype.render && superclass.prototype.render.call (this, selector) // or a bonafied Template
      };

      HTMLCustomElement.prototype.selectAll = function (selector) {
        return this.listenable
          (this.querySelectorAll (selector))
      };

      // watch out for clobbering `HTMLInputElement.select ()`
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
      HTMLCustomElement.prototype.select = function (selector) { return this.selectAll (selector) [0] };

      Object.defineProperties( HTMLCustomElement.prototype, prototypeAccessors );

      return HTMLCustomElement;
    }(GlobalEventHandlers (prototype)));

    try
      { window.customElements.define (tag, HTMLCustomElement) }

    finally
      { return window.customElements.get (tag) }
  }
}

// Assign `window.Element.prototype` in case of feature checking on `Element`
Element.prototype = window.Element.prototype
  // http://2ality.com/2013/09/window.html
  // http://tobyho.com/2013/03/13/window-prop-vs-global-var
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

