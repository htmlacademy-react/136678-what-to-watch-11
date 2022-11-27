import { dataProcess, initialState } from './data-process';
import { changeFavoriteStatusAction, getFilmsAction, getPromoFilmAction } from '../api-actions';
import { DataProcess } from '../../types/state';
import { makeFakeFilm } from '../../utils/mocks';
import { Film } from '../../types/film';

const film: Film = makeFakeFilm();
const films: Film[] = Array.from({ length: 4 }, makeFakeFilm);

describe('Reducer: dataProcess', () => {
  let state: DataProcess;

  beforeEach(() => {
    state = initialState;
  });

  it('without additional parameters should return initial state', () => {
    expect(dataProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  describe('changeFavoriteStatusAction', () => {
    it('should set promoFilm if fulfilled', () => {
      expect(dataProcess.reducer(state, { type: changeFavoriteStatusAction.fulfilled.type, payload: film }))
        .toEqual({ promoFilm: film, films: [], isLoading: false });
    });
  });

  describe('getPromoFilmAction', () => {
    it('should set promoFilm if fulfilled', () => {
      expect(dataProcess.reducer(state, { type: getPromoFilmAction.fulfilled.type, payload: film }))
        .toEqual({ promoFilm: film, films: [], isLoading: false });
    });
  });

  describe('getFilmsAction', () => {
    it('should set isLoading to true while pending', () => {
      expect(dataProcess.reducer(state, { type: getFilmsAction.pending.type }))
        .toEqual({ films: [], isLoading: true, promoFilm: null });
    });

    it('should set isLoading to false if rejected', () => {
      expect(dataProcess.reducer(state, { type: getFilmsAction.rejected.type }))
        .toEqual({ films: [], isLoading: false, promoFilm: null });
    });

    it('should set isLoading to false and set films if fulfilled', () => {
      expect(dataProcess.reducer(state, { type: getFilmsAction.fulfilled.type, payload: films }))
        .toEqual({ films: films, isLoading: false, promoFilm: null });
    });
  });
});
