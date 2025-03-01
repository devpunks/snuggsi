//Template =>
// Template.foo
// Template ['...']
// document.getElementsByTagName (tag)[name]

// innerHTML issues
// http://kieranpotts.com/blog/javascript-html-to-dom
// https://lists.w3.org/Archives/Public/public-webapps/2012AprJun/0334.html#start334

// investigate `Text.splitText ()`
// Recurse through elements and bind event handlers
// https://developer.mozilla.org/en-US/docs/Web/API/Text/splitText
//
// Greatly improve <template> implementaiton
// https://github.com/tmpvar/jsdom/commit/ceb79457dd01a19f56a615cf6a78598be8ed36b8
const Template = template => {

  let
    range = document.createRange ()

  template
    = typeof template === 'string'
    ? document.querySelector ( 'template[name=' + template + ']' )
    : template

  range.selectNodeContents ( template.content )

  let
    fragment = range.cloneContents ()

  , tokenize = (context, index) => {
      let
        clone = fragment.cloneNode (true)

      typeof context != 'object'
        && ( context  = { self: context })

      context ['#'] = index

      void (new TokenList (clone))
        .bind (context)

      return clone
    } // tokenize

  , bind = context => {
      range.deleteContents ()

      context && []
        .concat (context)
        .map (tokenize)
        .reverse () // Range.insertNode does prepend
        .map (fragment => range.insertNode (fragment))
    } // bind

  range.setStartAfter (template)
  template.bind = bind
  return template
} // Template

