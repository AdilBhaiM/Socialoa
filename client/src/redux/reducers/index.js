import { combineReducers } from "@reduxjs/toolkit";
import { AuthReducer } from "./AuthReducer.js";
import { PostReducer } from "./PostReducer.js";

export const reducers = combineReducers({
  auth: AuthReducer,
  post: PostReducer,
});