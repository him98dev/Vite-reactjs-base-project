import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';

export const rootReducer = combineReducers({
  userReducer
});
