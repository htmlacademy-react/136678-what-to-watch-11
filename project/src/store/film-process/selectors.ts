import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { Film } from '../../types/film';
import { Comment } from '../../types/comment';

export const getFilm = (state: State): Film | null => state[NameSpace.Film].film;

export const getSimilarFilms = (state: State): Film[] => state[NameSpace.Film].similarFilms;

export const getFilmComments = (state: State): Comment[] => state[NameSpace.Film].filmComments;

export const getFilmDataLoadingStatus = (state: State): boolean => state[NameSpace.Film].isLoading;
