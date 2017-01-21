class Observer {// extends Proxy {
  constructor (proto, configuration) {
    console.log ('proto', proto)
    console.log ('configuration', configuration)
    console.log ('proxy', Proxy)

    return Proxy
      // Revocable Proxy - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable
      // (Revokable)Proxy.revoke ()
      // If the revoke() function gets called,
      // the proxy becomes unusable
      .revocable (proto, configuration).proxy
  }
}
