// https://dev.to/aneeqakhan/throttling-and-debouncing-explained-1ocb
// https://www.geeksforgeeks.org/difference-between-debouncing-and-throttling
  // https://nordicapis.com/api-rate-limiting-vs-api-throttling-how-are-they-different
module.exports = {
  debounce (func, delay = 0) {
    let id

    return function () {
      clearTimeout (id)

      id = setTimeout
        ( _ => func (...arguments), delay )
    }
  } //debounce

, throttle (func, duration = 0) {
    let then

    return function () {
      const
        now = new Date
      , predicate = now - then >= duration

      predicate && (then = now)
        && func (...arguments)
    }
  } // throttle

  // https://en.wikipedia.org/wiki/Rate_limiting
, limit (func, max = 1) {
    let times = 0

    return function () {
      const predicate = ++times < max

      predicate && func (...arguments)
    }
  } // limit

} // exports
