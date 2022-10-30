class GlobalState {
  // 全局单例key
  static storeKey = Symbol(GlobalState.name);
  getStore() {
    if (!globalThis[GlobalState.storeKey]) {
      globalThis[GlobalState.storeKey] = {};
    }
    return globalThis[GlobalState.storeKey];
  }

  updateStore(key, value) {
    if (globalThis[GlobalState.storeKey]) {
      const state = globalThis[GlobalState.storeKey];
      globalThis[GlobalState.storeKey] = {
        ...state,
        [key]: value,
      };
    } else {
      globalThis[GlobalState.storeKey] = {
        [key]: value,
      };
    }
  }

  clear() {
    globalThis[GlobalState.storeKey] = {};
  }

  getState(key) {
    if (key) {
      return this.getStore()[key];
    }
    return this.getStore();
  }

  setState(key, value) {
    if (key) {
      this.updateStore(key, value);
    }
  }

  clearState(key) {
    if (key) {
      const state = this.getStore();
      const keys = Object.keys(state);
      const result = {};
      keys.forEach((k) => {
        if (k !== key) {
          result[k] = state[k];
        }
      });
      globalThis[GlobalState.storeKey] = result;
    }
  }
}

export const globalState = new GlobalState();

// Async Main Function
(async () => {
  const data = {
    name: 'jack',
  };
  globalState.setState('person', data);
  const result = globalState.getState('person');
  globalState.setState('jack', data);
  console.log('get person result is : ', result);
  console.log('another instance get store : ', new GlobalState().getStore());
  globalState.clearState('person');
  console.log('after clear get store : ', globalState.getStore());
})();
