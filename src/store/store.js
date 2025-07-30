import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import postReducer from "./postSlice"
import userDataReducer from "./userDataSlice"

export const store=configureStore({
    reducer:{
      auth:authReducer,
      post:postReducer,
      userData:userDataReducer
    }
})
