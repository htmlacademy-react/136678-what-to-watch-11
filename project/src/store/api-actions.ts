import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { Film } from '../types/film';
import { APIRoute } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthInfo } from '../types/auth-info';
import { UserInfo } from '../types/user-info';

export const getFilmsAction = createAsyncThunk<Film[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'getFilmsAction',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Film[]>(APIRoute.Films);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserInfo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuthAction',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<UserInfo>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserInfo, AuthInfo, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'loginAction',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserInfo>(APIRoute.Login, { email, password });
    saveToken(data.token);
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logoutAction',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
