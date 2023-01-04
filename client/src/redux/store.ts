import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { allergyApi } from './api/allergy.api';
import { authApi } from './api/auth.api';
import { categoryApi } from './api/category.api';
import { diseaseApi } from './api/disease.api';
import { docApi } from './api/doc.api';
import { petApi } from './api/pet.api';
import { profileApi } from './api/profile.api';
import { shcedulesApi } from './api/schedules.api';
import { userApi } from './api/user.api';
import { vacApi } from './api/vaccination.api';
import { visitApi } from './api/visit.api';
import errorSlice from './slices/errorSlice';
import authReducer from './slices/userSlice';
import type { AppDispatch } from './types';

const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorSlice,
    [authApi.reducerPath]: authApi.reducer,
    [petApi.reducerPath]: petApi.reducer,
    [docApi.reducerPath]: docApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [shcedulesApi.reducerPath]: shcedulesApi.reducer,
    [allergyApi.reducerPath]: allergyApi.reducer,
    [diseaseApi.reducerPath]: diseaseApi.reducer,
    [vacApi.reducerPath]: vacApi.reducer,
    [visitApi.reducerPath]: visitApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([
      authApi.middleware,
      petApi.middleware,
      docApi.middleware,
      userApi.middleware,
      categoryApi.middleware,
      profileApi.middleware,
      shcedulesApi.middleware,
      allergyApi.middleware,
      diseaseApi.middleware,
      vacApi.middleware,
      visitApi.middleware,
    ]),
});

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
