// http://exploringjs.com/es6/ch_template-literals.html#_implementing-tag-functions
//
module.exports = function (tokens, ...values) {
  tokens = tokens
    .map(token => strip (token))

  return context => {
    console.log (`rendering context: ${context}`)

    return values
      .reduce ((tag, value) => {
        return tag += `${value}${tokens.shift ()}`
      }, tokens.shift ())
  }
}

const strip = text => text.trimLeft ().trimRight ()

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
// var childProcess = sh`ps ax | grep ${pid}`;
