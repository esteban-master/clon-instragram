import { configureStore, combineReducers, AnyAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import authReducer from './auth/auth-slice'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'reduxjs-toolkit-persist'
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1'
import storage from 'reduxjs-toolkit-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel1
}

const reducers = combineReducers({
  auth: authReducer
})

const _persistedReducer = persistReducer<any, AnyAction>(
  persistConfig,
  reducers
)

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
  devTools: process.env.NODE_ENV === 'development'
})

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
