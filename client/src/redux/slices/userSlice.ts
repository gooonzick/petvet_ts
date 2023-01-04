/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { Doctor, Pet, User } from '../../models/models';
import type { RootState } from '../types';

type AuthState = {
  user: User | Doctor | null
  token: string | null
};

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials:
    (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: string }>,
    ) => {
      state.user = user;
      state.token = token;
    },
    signOut: (state) => {
      state.user = null;
      state.token = null;
    },
    updateUser: (state, { payload: user }: PayloadAction<User>) => {
      state.user = user;
    },
    getPets: (state, { payload: pets }: PayloadAction<Pet[]>) => {
      state.user!.pets = [...pets];
    },
  },
});

export const {
  setCredentials, signOut, getPets, updateUser,
} = slice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export default slice.reducer;
