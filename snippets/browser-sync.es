void function () {

  var script ='browser-sync-client.js';

  (
    (location.hostname.indexOf ('localhost')    >= 0)
      || (location.hostname.indexOf ('192.168') >= 0)
      || (location.hostname.indexOf ('127.0')   >= 0)
  )

  && document.write (script)

} ()
