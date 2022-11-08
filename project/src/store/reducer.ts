import {createReducer} from '@reduxjs/toolkit';
import { changeFilter, getFilms } from './action';
import { DEFAULT_GENRE_FILTER } from '../const';
import { FILMS } from '../mocks/films';
import { Film } from '../types/film';

const initialState = {
  genreFilter: DEFAULT_GENRE_FILTER,
  films: [] as Film[],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeFilter, (state, action) => {
      state.genreFilter = action.payload;
    })
    .addCase(getFilms, (state) => {
      state.films = FILMS;
    });
});

export { reducer };
