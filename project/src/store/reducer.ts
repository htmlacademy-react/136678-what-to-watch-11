import {createReducer} from '@reduxjs/toolkit';
import { changeFilter, incFilmsCount, resetFilmsCount } from './action';
import { DEFAULT_GENRE_FILTER, DEFAULT_SHOWN_FILM_COUNT } from '../const';
import { Film } from '../types/film';
import { fetchFilms } from './api-actions';

const initialState = {
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
    .addCase(fetchFilms.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchFilms.fulfilled, (state, action) => {
      state.films = action.payload;
      state.isLoading = false;
    });
});

export { reducer };
