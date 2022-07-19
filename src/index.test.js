import { createStore } from './index';

describe('stog', () => {
  let store, initState, action, setSome, setOther, listener, unsubscribe;

  beforeEach(() => {
    const storeBuilder = createStore();
    listener = jest.fn();

    store = storeBuilder.store;
    initState = storeBuilder.initState;
    action = storeBuilder.action;

    unsubscribe = store.subscribe(listener);

    setSome = action((state, some) => {
      return {
        ...state,
        some,
      };
    });

    setOther = action((state, other) => {
      return {
        ...state,
        other,
      };
    });

    initState({
      some: 'value',
      other: 'value',
    });
  });

  it('should return initial state', () => {
    expect(store.getState()).toEqual({
      some: 'value',
      other: 'value',
    });
  });

  it('should not call lister without calling dispatch', () => {
    expect(listener).not.toBeCalled();
  });

  it('should dispatch one action', () => {
    store.dispatch(setSome('newSomeValue'));

    expect(store.getState()).toEqual({
      some: 'newSomeValue',
      other: 'value',
    });
    expect(listener).toBeCalledTimes(1);
    expect(listener).toHaveBeenCalledWith({
      some: 'newSomeValue',
      other: 'value',
    });

    store.dispatch(setOther('newOtherValue'));

    expect(store.getState()).toEqual({
      some: 'newSomeValue',
      other: 'newOtherValue',
    });
    expect(listener).toBeCalledTimes(2);
    expect(listener).toHaveBeenCalledWith({
      some: 'newSomeValue',
      other: 'newOtherValue',
    });
  });

  it('should dispatch multiple action', () => {
    store.dispatch([setSome('newSomeValue'), setOther('newOtherValue')]);

    expect(store.getState()).toEqual({
      some: 'newSomeValue',
      other: 'newOtherValue',
    });

    store.dispatch(setOther('newOtherValue'));

    expect(listener).toBeCalledTimes(2);
    expect(listener).toHaveBeenCalledWith({
      some: 'newSomeValue',
      other: 'newOtherValue',
    });
  });

  it('should unsubscribe listener', () => {
    unsubscribe();

    store.dispatch(setSome('newSomeValue'));

    expect(store.getState()).toEqual({
      some: 'newSomeValue',
      other: 'value',
    });
    expect(listener).not.toBeCalled();

    store.dispatch([setSome('newSomeAnotherValue'), setOther('newOtherValue')]);

    expect(store.getState()).toEqual({
      some: 'newSomeAnotherValue',
      other: 'newOtherValue',
    });
    expect(listener).not.toBeCalled();
  });

  it('should execute unsubscribe twice without throw error', () => {
    unsubscribe();
    unsubscribe();
    expect(store.getState()).toEqual({
      some: 'value',
      other: 'value',
    });
    expect(listener).not.toBeCalled();
  });
});
