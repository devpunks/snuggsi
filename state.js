// State Machine
// http://whatis.techtarget.com/definition/state-machine

class State {
  constructor (attributes) {
    console.log (`State Machine`, attributes)

    return Proxy
      // Revocable Proxy - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable
      // (Revokable)Proxy.revoke ()
      // If the revoke() function gets called,
      // the proxy becomes unusable
      .revocable (attributes, this).proxy
  }

  get (subject, name) {
    console.log (arguments)
    console.log (this)
    console.log(arguments[2])
    return subject[name]
  }

  static get [Symbol.species] () { return Proxy }

  fuk () {}

  set (subject, name, value) {
    console.log (arguments)
  }
}
