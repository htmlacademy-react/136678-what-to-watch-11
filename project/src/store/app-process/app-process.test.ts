import { appProcess, initialState } from './app-process';
import { changeFilter, incFilmsCount, resetFilmsCount } from '../action';
import { DEFAULT_GENRE_FILTER, DEFAULT_SHOWN_FILMS_COUNT } from '../../const';
import { AppProcess } from '../../types/state';

describe('Reducer: appProcess', () => {
  let state: AppProcess;

  beforeEach(() => {
    state = initialState;
  });

  it('without additional parameters should return initial state', () => {
    expect(appProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  it('should set genre', () => {
    expect(appProcess.reducer(state, changeFilter('Action')))
      .toEqual({ genreFilter: 'Action', shownFilmsCount: DEFAULT_SHOWN_FILMS_COUNT });
  });

  it('should increment films count', () => {
    expect(appProcess.reducer(state, incFilmsCount()))
      .toEqual({
        genreFilter: DEFAULT_GENRE_FILTER,
        shownFilmsCount: DEFAULT_SHOWN_FILMS_COUNT + DEFAULT_SHOWN_FILMS_COUNT
      });
  });

  it('should reset films count', () => {
    expect(appProcess.reducer(state, resetFilmsCount()))
      .toEqual(initialState);
  });
});
