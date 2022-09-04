import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from './slices/userSlice';
import errorSlice from './slices/errorSlice';
import { authApi } from './api/auth.api';
import { petApi } from './api/pet.api';
import { docApi } from './api/doc.api';
import { categoryApi } from './api/category.api';
import { profileApi } from './api/profile.api';

const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorSlice,
    [authApi.reducerPath]: authApi.reducer,
    [petApi.reducerPath]: petApi.reducer,
    [docApi.reducerPath]: docApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([
      authApi.middleware,
      petApi.middleware,
      docApi.middleware,
      categoryApi.middleware,
      profileApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
