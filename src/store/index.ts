import {combineReducers, configureStore} from '@reduxjs/toolkit';
import cardReducer from './cards/cardSlice';

const rootReducer = combineReducers({
  cards: cardReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
