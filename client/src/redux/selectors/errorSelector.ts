import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../types';

const selectError = (state: RootState) => state.error;

export const errorTextSelecotor = createSelector(selectError, (state) => state.errorMessage);
export const isErrorSelecotr = createSelector(selectError, (state) => state.isError);
