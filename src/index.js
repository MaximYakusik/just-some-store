export const createStore = () => {
  const actionsMap = {};
  const listeners = [];
  let state = {};
  let actionCounter = 0;

  const dispatch = actions => {
    if (Array.isArray(actions)) {
      state = actions.reduce((current, action) => actionsMap[action.actionKey](current, action.payload), state);
    } else {
      state = actionsMap[actions.actionKey](state, actions.payload);
    }
    listeners.forEach(listener => {
      listener(state);
    });
  };
  const getState = () => state;
  const subscribe = listener => {
    listeners.push(listener);
  };
  const unsubscribe = callback => {
    const index = listeners.lastIndexOf(callback);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  };
  const initState = initialState => (state = initialState);
  const action = actionFn => {
    const actionKey = actionCounter++;
    actionsMap[actionKey] = actionFn;

    return payload => ({ actionKey, payload });
  };

  return {
    store: {
      dispatch,
      getState,
      subscribe,
      unsubscribe,
    },
    initState,
    action,
  };
};
