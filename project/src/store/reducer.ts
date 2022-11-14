import {createReducer} from '@reduxjs/toolkit';
import { changeFilter, incFilmsCount, resetFilmsCount } from './action';
import {
  addReviewAction,
  checkAuthAction, getFavoriteFilmsAction,
  getFilmAction, getFilmCommentsAction,
  getFilmsAction, getPromoFilmAction,
  getSimilarFilmsAction,
  loginAction,
  logoutAction
} from './api-actions';
import { AuthorizationStatus, DEFAULT_GENRE_FILTER, DEFAULT_SHOWN_FILM_COUNT } from '../const';
import { Film } from '../types/film';
import { Comment } from '../types/comment';
import { UserInfo } from '../types/user-info';

const initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null as (null | UserInfo),
  genreFilter: DEFAULT_GENRE_FILTER,
  films: [] as Film[],
  favoriteFilms: [] as Film[],
  promoFilm: {} as Film,
  film: null as Film | null,
  similarFilms: [] as Film[],
  filmComments: [] as Comment[],
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
    .addCase(getFavoriteFilmsAction.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getFavoriteFilmsAction.fulfilled, (state, action) => {
      state.favoriteFilms = action.payload;
      state.isLoading = false;
    })
    .addCase(getPromoFilmAction.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getPromoFilmAction.fulfilled, (state, action) => {
      state.promoFilm = action.payload;
      state.isLoading = false;
    })
    .addCase(getFilmAction.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getFilmAction.fulfilled, (state, action) => {
      state.film = action.payload;
      state.isLoading = false;
    })
    .addCase(getFilmCommentsAction.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getFilmCommentsAction.fulfilled, (state, action) => {
      state.filmComments = action.payload;
      state.isLoading = false;
    })
    .addCase(getSimilarFilmsAction.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getSimilarFilmsAction.fulfilled, (state, action) => {
      state.similarFilms = action.payload;
      state.isLoading = false;
    })
    .addCase(addReviewAction.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(addReviewAction.fulfilled, (state, action) => {
      state.filmComments = action.payload;
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
