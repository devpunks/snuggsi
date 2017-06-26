/*
  HTMLElement mixin which provides abstractions
  over the RxJS conventions through context state.

  State changes from the injected state$ stream will call
  onstatechange.
*/

const
  userActions = rxr.createMessageStreams ([ 'userClick' ])

, assign = state => {

    const
      users =
        [{'name': 'rob'}, {'name': 'dan'}]

    , spawn =
        Object.assign ( {}, state, {users} )

    return spawn
  }

, userClickReducer = userActions
    .userClick$
    .map (assign)

const Reactive = (Element) =>

class extends Element {

  get store () {
    let state = { users: [] }

    return {
      initialState: state,
      selector: (state) => ({ users: state.users }),
      state$: rxr.createState (userClickReducer, state)
    }
  }

  // configure streams within onidle,
  // avoids blocking the first paint.
  onconnect () {

    let target = this.onstatechange

    this.stream =
      this.store.state$

      // immutable conventions allow for
      // standard comparison operator.
      .distinctUntilChanged ((x, y) => (x == y))

      // reduce state into selected scope
      .map (this.store.selector)
      .subscribe (target)
  }

  // receives state updates
  onstatechange (state) { return }

}

