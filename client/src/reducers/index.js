import { combineReducers } from "redux";
import authReducer from "./authReducer";

combineReducers({
  auth: authReducer
});

export default combineReducers;
