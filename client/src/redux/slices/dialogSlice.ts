/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type DialogState = {
  isOpen: boolean;
  message: string | null;
  confirm?: () => void;
};

const initialState = { isOpen: false, message: null, confirm: undefined } as DialogState;

const slice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    showDialog:
    (
      state,
      { payload: { message, confirm } }: PayloadAction<{ message: string, confirm: () => void }>,
    ) => {
      state.isOpen = true;
      state.message = message;
      state.confirm = confirm;
    },
    closeDialog: () => initialState,
  },
});

export const { showDialog, closeDialog } = slice.actions;
export const selectCurrentUser = (state: RootState) => state;
export default slice.reducer;
