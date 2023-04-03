import {
  legacy_createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from "redux";

import { CartReducer } from "./CartPage/reducer";
import { productReducer } from "./ProductPage/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  CartReducer,
  productReducer,
});

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = compose;

export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
