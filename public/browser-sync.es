console.warn (`script loaded from ${document.currentScript.ownerDocument.title} - ${window.location}`)

void function () {
  let script = `<script src='\/browser-sync\/browser-sync-client.js'><\/script>`

  if (location.hostname.includes (`localhost`))
    document.write (script)
} ()
