/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../types';

type ErrorState = {
  isError: boolean
  errorMessage: string | null
};

const slice = createSlice({
  name: 'error',
  initialState: { isError: false, errorMessage: null } as ErrorState,
  reducers: {
    showError:
    (
      state,
      { payload: message }: PayloadAction<string>,
    ) => {
      state.isError = true;
      state.errorMessage = message;
    },
    hideError: (state) => {
      state.isError = false;
      state.errorMessage = null;
    },
  },
});

export const { showError, hideError } = slice.actions;
export const selectCurrentUser = (state: RootState) => state;
export default slice.reducer;
