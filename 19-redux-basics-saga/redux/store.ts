import { EnthusiasmAction } from './actions';
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga';
import rootReducer, { StoreState } from './reducers';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore<StoreState, EnthusiasmAction, unknown, unknown>(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch