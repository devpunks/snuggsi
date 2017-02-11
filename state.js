// State Machine
// http://whatis.techtarget.com/definition/state-machine
class State {
  constructor (attributes) {
    console.warn (`State Machine`, attributes)

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
    return Proxy
      // (Revokable)Proxy.revoke ()
      // - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable
      .revocable (attributes, this)
      .proxy
      // If .revoke() called, the proxy becomes unusable
  }

  static get [Symbol.species] () { return Proxy }

  // Proxies are rad because you get (pun intended)
  // access to:
  // 1. the core `subject` object
  // 2. the property `name`
  // 3. the `self` (proxy) returned on instantiation
  // 4. `this` refers to the ghost `State` instance
  get (subject, name, self) { return subject [name] }

  // Proxies are rad because you set access to:
  // 1. the core `subject` object
  // 2. the property `name`
  // 3. the property `value`
  // 4. the `self` (proxy) returned on instantiation
  // 5. `this` refers to the ghost `State` instance
  set (subject, name, value, self) {
    if(self [Symbol.species] && subject [name] !== value)
      self [Symbol.species] (name, value) // forces `set` to be called second time

    return (subject [name] !== value) ?
      subject [name] = value :
      subject [name]
  }
}
