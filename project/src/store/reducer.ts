import {createReducer} from '@reduxjs/toolkit';
import { changeFilter, incFilmsCount, resetFilmsCount } from './action';
import { checkAuthAction, getFilmsAction, loginAction, logoutAction } from './api-actions';
import { AuthorizationStatus, DEFAULT_GENRE_FILTER, DEFAULT_SHOWN_FILM_COUNT } from '../const';
import { Film } from '../types/film';
import { UserInfo } from '../types/user-info';

const initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null as (null | UserInfo),
  genreFilter: DEFAULT_GENRE_FILTER,
  films: [] as Film[],
  filmsCount: DEFAULT_SHOWN_FILM_COUNT,
  isLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeFilter, (state, action) => {
      state.genreFilter = action.payload;
    })
    .addCase(incFilmsCount, (state) => {
      state.filmsCount += DEFAULT_SHOWN_FILM_COUNT;
    })
    .addCase(resetFilmsCount, (state) => {
      state.filmsCount = DEFAULT_SHOWN_FILM_COUNT;
    })
    .addCase(getFilmsAction.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getFilmsAction.fulfilled, (state, action) => {
      state.films = action.payload;
      state.isLoading = false;
    })
    .addCase(checkAuthAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userInfo = action.payload;
    })
    .addCase(checkAuthAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(loginAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userInfo = action.payload;
    })
    .addCase(loginAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(logoutAction.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});

export { reducer };
