import { createSlice } from '@reduxjs/toolkit';

import {
  changeFavoriteStatusAction,
  checkAuthAction,
  getFavoriteFilmsAction,
  loginAction,
  logoutAction
} from '../api-actions';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserProcess } from '../../types/state';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
  favoriteFilms: [],
  isLoading: false,
};

const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
        state.isLoading = false;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoading = false;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo = null;
        state.favoriteFilms = [];
      })
      .addCase(getFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        if (action.payload.isFavorite && !state.favoriteFilms.find((film) => film.id === action.payload.id)) {
          state.favoriteFilms.push(action.payload);
        } else {
          state.favoriteFilms = state.favoriteFilms.filter((film) => film.id !== action.payload.id);
        }
      });
  }
});

export { userProcess };
