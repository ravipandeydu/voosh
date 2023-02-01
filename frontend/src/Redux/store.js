import {
  legacy_createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from "redux";
import { authReducer } from "./auth/auth.reducer";
import thunk from "redux-thunk";
import { orderReducer } from "./order/order.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
});

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
  rootReducer,
  createComposer(applyMiddleware(thunk))
);

export { store };
