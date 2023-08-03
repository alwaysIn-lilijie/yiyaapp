import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { networkService } from '@/networking';
import { rootReducer } from '@/reducers';
import { storage } from '@/storage';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['error', 'status'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    {
      immutableCheck: false,
      serializableCheck: false,
    }
  ).concat(thunk.withExtraArgument({ networkService, demoMode: true })),
});


export const persistor = persistStore(store);
