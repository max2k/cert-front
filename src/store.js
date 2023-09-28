import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import errorReducer from './features/error/errorSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
  },
});

export default store;
