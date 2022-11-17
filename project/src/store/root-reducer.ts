import { combineReducers } from '@reduxjs/toolkit';
import { appProcess } from './app-process/app-process';
import { dataProcess } from './data-process/data-process';
import { filmProcess } from './film-process/film-process';
import { userProcess } from './user-process/user-process';
import { NameSpace } from '../const';

const rootReducer = combineReducers({
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.Film]: filmProcess.reducer,
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});

export { rootReducer };
