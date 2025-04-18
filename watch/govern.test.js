const
  assert = require('assert')
, { test, describe, beforeEach: before, afterEach: after }
  = require('node:test')
, { skip, todo } = test.it
, context = describe

const { debounce, throttle, limit }
  = require('./govern.js')


describe( 'limit', _=> {
  let count = 0
  let expected = Math.round ( Math.random () * 10 )
  let unlimited = limit ( _ => ++count )

  test ('unlimited', _=> {
    for ( let i = 0; i < expected; i++ ) unlimited ()

    assert ( count === expected )
  }) // test

  context ('when below maximum', _=> {
    let count = 0, maximum = 1
    let limited = limit ( _=> ++count, maximum )

    test ('below', _=> {
      limited ()

      assert ( count === maximum )
    }) // test
  })

  context ('when maximum', _=> {
    let count = 0, maximum = 1
    let limited = limit ( _=> ++count, maximum )

    test ('maximum', _=> {
      limited ()
      limited ()

      assert ( count === maximum )
    }) // test
  }) // context
}) // limit

describe( 'throttle', _=> {
  let count = 0, expected = 1
  let unthrottled = throttle ( _=> ++count )

  test ('initial call', _=> {
    unthrottled ()

    assert ( count === expected )
  }) // test

  context ('when fast', _=> {
    let duration = 10, count = 0, expected = 1
    let throttled = throttle ( _=> ++count, duration )

    test ('only called once', self => {
      throttled ()
      throttled ()

      assert ( count === expected )
    }) // test
  }) // context

  context ('when slow', _=> {
    let duration = 10, count = 0, expected = 2
    let throttled = throttle ( _ => ++count, duration )

    test ('called twice', async _=> {
      throttled ()

      await new Promise (resolve => setTimeout ( _=> {
        throttled () ; resolve ()
      }, duration * 2 ) )

      assert ( count === expected )
    }) // test
  })
}) // throttle

describe( 'debounce', _=> {
  let delay = 100, count = 0, expected = 1
  let debounced = debounce ( _=> ++count )

  test ('initial call', async _=> {
    debounced ()

    await new Promise (resolve => setTimeout ( _=> {
      resolve ()
    }, delay * 2 ) )

    assert ( count === expected )
  }) // test

  context ('when fast', _=> {
    let delay = 100, count = 0, expected = 1
    let debounced = debounce ( _=> ++count, delay )

    test ('only called once', async _=> {
      debounced ()
      debounced ()

      await new Promise (resolve => setTimeout ( _=> {
        assert ( count === expected )
        resolve ()
      }, delay * 2 ) )
    }) // test
  }) // context

  context ('when slow', _=> {
    let delay = 100, count = 0, expected = 2
    let debounced = debounce ( _=> ++count, delay )

    test ('called twice', async _=> {
      debounced ()
      debounced ()

      await new Promise (resolve => setTimeout ( _=> {
        debounced () ; resolve ()
      }, delay * 2 ) )

      await new Promise (resolve => setTimeout ( _=> {
        assert ( count === expected )
        resolve ()
      }, delay * 2 ) )
    }) // test
  }) // context
}) // debounce

