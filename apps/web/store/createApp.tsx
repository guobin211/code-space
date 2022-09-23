import React, { useEffect, useState } from 'react';
import { IS_SERVER } from './createCache';
import { Patcher } from './createStore';
import store, { AppContext } from './store';

/**
 * 创建一个store的provider
 * @param FC {React.FC}
 * @returns {React.FC}
 */
export function createApp<P extends object>(FC: React.FC<P>) {
  const AppContextStore: React.FC<{
    children: React.ReactNode;
  }> = (props) => {
    const { children, ...rest } = props;
    const [hasSync, setHasSync] = useState(IS_SERVER);
    const [pageState, setPageState] = useState(rest);

    const updateState = (updater: Patcher<P>) => {
      setPageState((prev) => ({ ...prev, ...updater }));
    };

    const listener = (state: object) => {
      updateState(state);
    };

    useEffect(() => {
      const subs = store.subscribe(listener);
      return () => {
        subs();
      };
    }, []);

    useEffect(() => {
      store.syncLocalState();
      setHasSync(true);
    }, []);

    const value = {
      ...pageState,
      updateState,
    } as any;

    const adapterStyle = {
      display: hasSync && !IS_SERVER ? 'block' : 'none',
    };

    return (
      <AppContext.Provider value={value}>
        <div style={adapterStyle}>{children}</div>
      </AppContext.Provider>
    );
  };
  return (props: P) => (
    <AppContextStore {...props}>
      <FC {...props}></FC>
    </AppContextStore>
  );
}
