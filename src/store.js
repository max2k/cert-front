import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import errorReducer from './features/error/errorSlice';
import certReducer from './features/certificate/certSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
    cert: certReducer,
  },
});

export default store;
