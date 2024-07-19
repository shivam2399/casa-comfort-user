import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './cartSlice';
import authSlice from './authSlice';
import addressReducer from './addressSlice';
import orderSlice from './orderSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart', 'address', 'orders']
}

const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartReducer,
  address: addressReducer,
  orders: orderSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer
})

export const persistor = persistStore(store)

export default store;
