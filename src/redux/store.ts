import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import authReducer from './auth/auth-slice'

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
  preloadedState: {},
  devTools: process.env.NODE_ENV === 'development'
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
