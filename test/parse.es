console.log ('Parser')

// Window - https://github.com/capricorn86/happy-dom/wiki/Window
// Console - https://github.com/capricorn86/happy-dom/wiki/VirtualConsole
const
  { JSDOM } = require (`jsdom`)
//, { Window } = require ('happy-dom')

// Use Node.js console
// https://github.com/capricorn86/happy-dom/wiki/VirtualConsole
// const window = new Window({ console: global.console })

module.exports = { JSDOM }

