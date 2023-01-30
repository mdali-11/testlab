import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import userReducer from "./userSlice/userSlice";
import testReducer from "./testSlice/testSlice";
const store=configureStore({
  reducer: {
    user: userReducer,
    test:testReducer,
  }
  
})

export default store;