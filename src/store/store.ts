import { configureStore } from '@reduxjs/toolkit'
import favoriteReducer from './favoriteSlice';
import basketReducer from './basketSlice';


export const store = configureStore({
  reducer: {
    favorite: favoriteReducer,
    basket: basketReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch