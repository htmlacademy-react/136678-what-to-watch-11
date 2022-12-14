import { createAction } from '@reduxjs/toolkit';

export const changeFilter = createAction('main/changeFilter', (filter: string) => ({
  payload: filter,
}));
export const incFilmsCount = createAction('incFilmsCount');
export const resetFilmsCount = createAction('resetFilmsCount');
