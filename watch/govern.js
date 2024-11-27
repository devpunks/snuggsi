// https://www.geeksforgeeks.org/difference-between-debouncing-and-throttling
module.exports = {
  debounce (func, delay = 0) {
    let id

    return function () {
      clearTimeout (id)

      id = setTimeout
        ( _ => func (...arguments), delay )
    }
  } //debounce

  // https://nordicapis.com/api-rate-limiting-vs-api-throttling-how-are-they-different
, throttle (func, delay = 0) {
    let
        active, times = 0 // semaphore ???

//, `Run times (${ ++times })\n`
    let wait = false

    return function () {
      if (wait) return

      func (...arguments)
      wait = true
      setTimeout ( _ => wait = false, delay );
    }
  } // throttle

  // https://en.wikipedia.org/wiki/Rate_limiting
, limit (func, delay = 0) { } // limit

} // exports
