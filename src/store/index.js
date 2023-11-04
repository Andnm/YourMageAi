import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import transactionReducer from "./transactionSlice";
import imageGeneralReducer from './imageGeneralSlice';
import messageReducer from "./messageSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    transaction: transactionReducer,
    imageGeneral: imageGeneralReducer,
    message: messageReducer
  },
});

export default store;
