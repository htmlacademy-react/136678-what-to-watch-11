import {createReducer} from '@reduxjs/toolkit';
import { changeFilter, getFilms, incFilmsCount, resetFilmsCount } from './action';
import { DEFAULT_GENRE_FILTER, DEFAULT_SHOWN_FILM_COUNT } from '../const';
import { FILMS } from '../mocks/films';
import { Film } from '../types/film';

const initialState = {
  genreFilter: DEFAULT_GENRE_FILTER,
  films: [] as Film[],
  filmsCount: DEFAULT_SHOWN_FILM_COUNT,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeFilter, (state, action) => {
      state.genreFilter = action.payload;
    })
    .addCase(getFilms, (state) => {
      state.films = FILMS;
    })
    .addCase(incFilmsCount, (state) => {
      state.filmsCount += DEFAULT_SHOWN_FILM_COUNT;
    })
    .addCase(resetFilmsCount, (state) => {
      state.filmsCount = DEFAULT_SHOWN_FILM_COUNT;
    });
});

export { reducer };
