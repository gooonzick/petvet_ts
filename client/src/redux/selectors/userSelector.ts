import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../types';

const selectUser = (state: RootState) => state.auth.user;

export const userNameSelector = createSelector(selectUser, (user) => user?.name);
export const userGroupSelector = createSelector(selectUser, (user) => user?.userGroupId);
export const userImageSelector = createSelector(selectUser, (user) => user?.img);
export const userSelector = createSelector(selectUser, (user) => user);
