import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducers";

export const store = configureStore({
    reducer: reducers,
    devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
})