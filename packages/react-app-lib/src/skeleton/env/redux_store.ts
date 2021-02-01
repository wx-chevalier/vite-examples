import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { ReducersMapObject } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack-fsa';

import { configReducer } from '../../ducks';
import { history } from './singleton';

export function configAppStore(preloadedState: Record<string, unknown> = {}) {
  const rootReducer = configReducer({})(history);

  const store = configureStore({
    reducer: rootReducer,
    middleware: [
      routerMiddleware(history),
      ...getDefaultMiddleware(),
      reduxPackMiddleware,
    ],
    preloadedState,
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../../ducks', () => store.replaceReducer(rootReducer));
  }

  function appendReducer(asyncReducers: ReducersMapObject) {
    store.replaceReducer(configReducer(asyncReducers)(history));
  }

  return {
    ...store,
    appendReducer,
  };
}

export const defaultStore = configAppStore();
