void function () {

  void (
    (location.hostname.indexOf ('localhost')    >= 0)
      || (location.hostname.indexOf ('192.168') >= 0)
      || (location.hostname.indexOf ('127.0')   >= 0)
  )

  && function () {
    let script = document.createElement ('script')
    script.src = '/browser-sync/browser-sync-client.js'
    document.head.appendChild (script)
  } ()
} ()
