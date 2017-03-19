// https://developers.google.com/web/updates/2015/01/ES6-Template-Strings#tagged_templates

// innerHTML issues
// http://www.kieranpotts.com/blog/javascript-html-to-dom/

// https://lists.w3.org/Archives/Public/public-webapps/2012AprJun/0334.html#start334
function tag (...fragments) {

  let html = ('string' === typeof fragments [0])
    ? fragments [0]
    : fragments [0][0]

  let context = fragments [1]

  let bind = context => {
    let pattern = Object
      .keys (context)
      .map (key => `{${key}}`)
      .join (`|`)

    let expression = new RegExp (pattern,`g`)

    return html
      .trim ()
      .replace ( expression,
        match => context [match.replace (/{|}/g, ``)]
      )
  }

  return context
    ? bind (context)
    : context => bind (context)
}

// Contextual auto-escaping
// qsa`.${className}`;
// safehtml`<a href="${url}?q=${query}" onclick="alert('${message}')" style="color: ${color}">${message}</a>`;
//
// // Localization and formatting
// l10n`Hello ${name}; you are visitor number ${visitor}:n! You have ${money}:c in your account!`
//
// // Embedded HTML/XML
// jsx`<a href="${url}">${text}</a>` // becomes React.DOM.a({ href: url }, text)
//
// // DSLs for code execution
// var childProcess = sh`ps ax | grep ${pid}`
