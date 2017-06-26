const
  userActions = rxr.createMessageStreams([ 'userClick' ])

, userClickReducer = userActions.userClick$
    .map(value => state => {
      let
        users = [{'name': 'rob'}, {'name': 'dan'}]

      return Object.assign({}, state, {users: users})
    })

// Initial component state
, initialState = { users: [] }
, stateSelector = (state) =>
    ({
      users: state.users,
    })

, userStore = createStore(initialState, 
    userClickReducer, stateSelector)
