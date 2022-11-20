import { createSlice } from '@reduxjs/toolkit';

import {
  addReviewAction,
  changeFavoriteStatusAction,
  getFilmAction,
  getFilmCommentsAction,
  getSimilarFilmsAction,
} from '../api-actions';
import { NameSpace } from '../../const';
import { FilmProcess } from '../../types/state';
import { Film } from '../../types/film';

const initialState: FilmProcess = {
  film: null as Film | null,
  similarFilms: [],
  filmComments: [],
  isLoading: false,
};

const filmProcess = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFilmAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isLoading = false;
      })
      .addCase(getFilmAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getFilmCommentsAction.fulfilled, (state, action) => {
        state.filmComments = action.payload;
      })
      .addCase(getSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(addReviewAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReviewAction.fulfilled, (state, action) => {
        state.filmComments = action.payload;
        state.isLoading = false;
      })
      .addCase(addReviewAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        state.film = action.payload;
      });
  }
});

export { filmProcess };
