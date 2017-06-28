const Reactive = Element =>

  /*
    HTMLElement mixin which provides abstractions
    over the RxJS conventions through context state.

    State changes from the injected state$ stream will call
    onstatechange.
  */

class extends Element {

  hydrate () {

    const
      assign = state => {
        console.log ('assigning & spawning')

        const
          spawn = Object.assign ( {}, state, {users: this.context.users} )

        return spawn
      }

    , userClickReducer =
        this.actions
          .onclick$
          .map (assign)

    return {
      initialState: this.context,
      selector: (state) => ({ users: this.context.users }),
      state$: rxr.createState (userClickReducer, this.context)
    }
  }

  get actions ()
    { return rxr.createMessageStreams ([ 'onclick' ]) }

  // configure streams within onidle,
  // avoids blocking the first paint.
  onconnect () {

    void (this.store = this.hydrate ())

      .state$

      // immutable conventions allow for
      // standard comparison operator.
      .distinctUntilChanged ((x, y) => (x == y))

      // reduce state into selected scope
      .map (this.store.selector)

      .subscribe (this.onstatechange)
  }
}

