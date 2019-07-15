import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { ILogin } from "./types/types";
import { TStoreState } from ".";
import thunk from "redux-thunk";

export default function configureStore(storeState: TStoreState) {
  const store = createStore<TStoreState, ILogin, any, any>(rootReducer, storeState, applyMiddleware(thunk));
  return store;
}