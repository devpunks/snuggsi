// https://www.geeksforgeeks.org/difference-between-debouncing-and-throttling
module.exports = {
  debounce (func, delay = 0) {
console.log('Debouncing', func)
    let id

    return function () {
console.log('Clearing timeout')
      clearTimeout (id)

console.log('Setting timeout')
      id = setTimeout
        ( _ => { func (...arguments) }, delay)
    }
  } //debounce

  // https://nordicapis.com/api-rate-limiting-vs-api-throttling-how-are-they-different
, throttle (func, delay = 0) {
console.log('Throttling', func)
    let
        active, times = 0 // semaphore ???

//, `Run times (${ ++times })\n`
    let wait = false
console.log('Setting up wait', wait)

    return function () {
console.log('Pre Wait value', wait)
      if (wait) return

console.log('Calling', func)
      func (...arguments)
      wait = true
console.log('Post Wait value', wait)
      setTimeout ( _ => { console.log('time b', wait); wait = false; console.log('time a', wait) }, delay);
    }
  } // throttle

  // https://en.wikipedia.org/wiki/Rate_limiting
, limit (func, delay = 0) {
    //
  } // limit
} // exports
