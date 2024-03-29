import AuthReducer from "./AuthRedux";

import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const reducer = combineReducers({ AuthReducer });

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;