function createReducer(initialState, reducers) {
  return {
    store: initialState,
    reducer: (state, action) => {
      if (reducers[action.type]) {
        return reducers[action.type](state, action);
      } else {
        return state;
      }
    },
  };
}
export default createReducer;
