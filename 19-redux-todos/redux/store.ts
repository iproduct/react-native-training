import { EnthusiasmAction } from './actions';
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer, { StoreState } from './reducers';

export const store = createStore<StoreState, EnthusiasmAction, unknown, unknown>(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
  );