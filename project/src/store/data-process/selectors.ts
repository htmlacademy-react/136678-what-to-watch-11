import { createSelector } from '@reduxjs/toolkit';

import { getGenreFilter } from '../app-process/selectors';
import { DEFAULT_GENRE_FILTER, NameSpace } from '../../const';
import { State } from '../../types/state';
import { Film } from '../../types/film';

export const getFilms = (state: State): Film[] => state[NameSpace.Data].films;

export const getPromoFilm = (state: State): Film | null => state[NameSpace.Data].promoFilm;

export const getFilmsDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isLoading;

export const getGenreList = (state: State): string[] => [DEFAULT_GENRE_FILTER, ...new Set(state[NameSpace.Data].films.map((film) => film.genre))];

export const getFilteredFilms = createSelector(
  [getFilms, getGenreFilter],
  (films, genre) => {
    if (genre === DEFAULT_GENRE_FILTER) {
      return films;
    }

    return films.filter((film) => film.genre === genre);
  }
);
