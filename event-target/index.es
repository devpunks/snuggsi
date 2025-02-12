function EventTarget ( Element ) { // why buble

// WHATWG Living Standard HTML5 EventTarget
// https://dom.spec.whatwg.org/#eventtarget
//
// MDN EventTarget
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget

// DOM Levels
// (https://developer.mozilla.org/fr/docs/DOM_Levels)
//
// DOM Level 0 EventTarget
// This event handling model was introduced by Netscape Navigator,
// and remains the most cross-browser model as of 2005
// https://en.wikipedia.org/wiki/DOM_events#DOM_Level_0#DOM_Level_0
//
// DOM Level 2 EventTarget
// (AKA Str🎱  W3C #fockery) ➡️  https://annevankesteren.nl/2016/01/film-at-11
// 😕  https://w3c.github.io/uievents/DOM3-Events.html#interface-EventTarget
//❓❓ https://w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html
// https://w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-EventTarget
// Within https://w3c.github.io/uievents/#conf-interactive-ua
// EventTarget links to WHATWG - https://dom.spec.whatwg.org/#eventtarget
//
// DOM Level 3 EventTarget
// https://w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-EventTarget

//
// All Event Handling Models
// https://en.wikipedia.org/wiki/DOM_events#Event_handling_models
//
// Inline Model
// https://en.wikipedia.org/wiki/DOM_events#Inline_model
//
// Traditional Model
// https://en.wikipedia.org/wiki/DOM_events#Traditional_model
//
// Traditional Registration
// http://quirksmode.org/js/events_tradmod.html
//
// HandleEvent Registration
//   - https://gomakethings.com/callbacks-on-web-components
//   - https://viperhtml.js.org/hyperhtml/documentation/#essentials-6

  // MDN EventTarget.dispatchEvent
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
  //
  // WHATWG Living Standard EventTarget.dispatchEvent
  // https://dom.spec.whatwg.org/#dom-eventtarget-dispatchevent
  //
  // DOM Level 2 EventTarget.dispatchEvent
  //  https://w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-dispatchEvent
  Element.prototype.dispatch = function (name) {

    this.dispatchEvent
      ( new Event ( name ) )
  } // dispatch

  // Classic `on*=TOKEN` attribute handlers
  Element.prototype.register = function ( node, handler, event ) {

    for (let attribute of
      [].slice.call ( node.attributes ) )
        /^on/.test ( event = attribute.name )
        // https://quirksmode.org/js/events_tradmod.html
        // because under traditional registration the handler value
        // is wrapped in scope `function on*() {\nonfoo\n}`
        && ( handler = ( /{\s(\w+)\s}/.exec ( node [event] ) || [] ) [1] )
        && ( node [event] = this.renderable (this [handler]) )
  } // register

  // MDN EventTarget.removeEventListener
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
  //
  // WHATWG Living Standard EventTarget.removeEventListener
  // https://dom.spec.whatwg.org/#dom-eventtarget-removeeventlistener
  //
  // DOM Level 2 EventTarget.removeEventListener
  // https://w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-removeEventListener

//off (event, listener = 'on' + this [event])
//  { this.removeEventListener ( event, listener ) }

// MDN EventTarget.addEventListener
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
//
// WHATWG Living Standard EventTarget.addEventListener
// https://dom.spec.whatwg.org/#dom-eventtarget-removeeventlistener
//
// DOM Level 2 EventTarget.addEventListener
// https://w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-addEventListener
  Element.prototype.on = function ( event, handler ) {

    this.addEventListener
      ( event, this.renderable ( handler , /* TODO: `options` & `useCapture` */ ) )
  } // on

  // Reflection - https://en.wikipedia.org/wiki/Reflection_(computer_programming)
  // Type Introspection - https://en.wikipedia.org/wiki/Type_introspection
  //
  // In computing, type introspection is the ability of a program
  // to examine the type or properties of an object at runtime.
  // Some programming languages possess this capability.
  //
  // Introspection should not be confused with reflection,
  // which goes a step further and is the ability for a program to manipulate the values,
  // meta-data, properties and/or functions of an object at runtime.
  Element.prototype.reflect = function ( handler ) {

    /^on/.test ( handler ) // is a W3C `on*`event
      && // handler is defined on class
        handler in HTMLElement.prototype // `on*`

      && // automagically delegate event
        this.on ( handler.substr (2), this [handler] )
  } // reflect

  // BIG BUG IN IE!!!
  //
  // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
  //
  // https://github.com/webcomponents/webcomponents-platform/blob/master/webcomponents-platform.js#L16
  Element.prototype.renderable = function ( handler ) {

    return event =>
      // for `return false`
      handler.call ( this, event ) !== false
        // check render availability
        && event.defaultPrevented
        || this.render ()
  } // renderable

  return Element
} // EventTarget

