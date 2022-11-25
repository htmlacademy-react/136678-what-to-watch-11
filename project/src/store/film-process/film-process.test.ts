import { filmProcess, initialState } from './film-process';
import {
  addReviewAction,
  changeFavoriteStatusAction,
  getFilmAction,
  getFilmCommentsAction,
  getSimilarFilmsAction
} from '../api-actions';
import { makeFakeFilm, makeFakeFilmComment } from '../../utils/mocks';
import { FilmProcess } from '../../types/state';
import { Film } from '../../types/film';
import { Comment } from '../../types/comment';

const film: Film = makeFakeFilm();
const similarFilms: Film[] = Array.from({ length: 4 }, makeFakeFilm);
const filmComments: Comment[] = Array.from({ length: 3 }, makeFakeFilmComment);

describe('Reducer: filmProcess', () => {
  let state: FilmProcess;

  beforeEach(() => {
    state = initialState;
  });

  it('without additional parameters should return initial state', () => {
    expect(filmProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  describe('getFilmAction', () => {
    it('should set isLoading to true while pending', () => {
      expect(filmProcess.reducer(state, { type: getFilmAction.pending.type }))
        .toEqual({ film: null, similarFilms: [], filmComments: [], isLoading: true });
    });

    it('should set film if fulfilled', () => {
      expect(filmProcess.reducer(state, { type: getFilmAction.fulfilled.type, payload: film }))
        .toEqual({ film: film, similarFilms: [], filmComments: [], isLoading: false });
    });

    it('should set isLoading to false if rejected', () => {
      expect(filmProcess.reducer(state, { type: getFilmAction.rejected.type }))
        .toEqual({ film: null, similarFilms: [], filmComments: [], isLoading: false });
    });
  });

  describe('getFilmCommentsAction', () => {
    it('should set filmComments if fulfilled', () => {
      expect(filmProcess.reducer(state, { type: getFilmCommentsAction.fulfilled.type, payload: filmComments }))
        .toEqual({ film: null, similarFilms: [], filmComments: filmComments, isLoading: false });
    });
  });

  describe('getSimilarFilmsAction', () => {
    it('should set similarFilms if fulfilled', () => {
      expect(filmProcess.reducer(state, { type: getSimilarFilmsAction.fulfilled.type, payload: similarFilms }))
        .toEqual({ film: null, similarFilms: similarFilms, filmComments: [], isLoading: false });
    });
  });

  describe('addReviewAction', () => {
    it('should set isLoading to true while pending', () => {
      expect(filmProcess.reducer(state, { type: addReviewAction.pending.type }))
        .toEqual({ film: null, similarFilms: [], filmComments: [], isLoading: true });
    });

    it('should set filmComments if fulfilled', () => {
      expect(filmProcess.reducer(state, { type: addReviewAction.fulfilled.type, payload: filmComments }))
        .toEqual({ film: null, similarFilms: [], filmComments: filmComments, isLoading: false });
    });

    it('should set isLoading to false if rejected', () => {
      expect(filmProcess.reducer(state, { type: addReviewAction.rejected.type }))
        .toEqual({ film: null, similarFilms: [], filmComments: [], isLoading: false });
    });
  });

  describe('changeFavoriteStatusAction', () => {
    it('should set film if fulfilled', () => {
      expect(filmProcess.reducer(state, { type: changeFavoriteStatusAction.fulfilled.type, payload: film }))
        .toEqual({ film: film, similarFilms: [], filmComments: [], isLoading: false });
    });
  });
});
