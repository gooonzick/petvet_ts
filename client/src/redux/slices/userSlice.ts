/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Pet, User } from '../../models/models';

type AuthState = {
    user: User | null
    token: string | null
  }

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials:
    (
      state,
      { payload: { user, token } }: PayloadAction<{user: User; token: string}>,
    ) => {
      state.user = user;
      state.token = token;
    },
    signOut: (state) => {
      state.user = null;
      state.token = null;
    },
    getPets: (state, { payload: pets }: PayloadAction<Pet[]>) => {
      state.user!.pets = [...pets];
    },
  },
});

export const { setCredentials, signOut, getPets } = slice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export default slice.reducer;
