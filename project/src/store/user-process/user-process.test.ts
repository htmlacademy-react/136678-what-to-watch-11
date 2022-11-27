import { initialState, userProcess } from './user-process';
import {
  changeFavoriteStatusAction,
  checkAuthAction,
  getFavoriteFilmsAction,
  loginAction,
  logoutAction
} from '../api-actions';
import { AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state';
import { Film } from '../../types/film';
import { makeFakeFilm, makeFakeUser } from '../../utils/mocks';
import { UserInfo } from '../../types/user-info';

const film: Film = makeFakeFilm();
const favoriteFilms: Film[] = Array.from({ length: 4 }, makeFakeFilm);
const userInfo: UserInfo = makeFakeUser();

describe('Reducer: userProcess', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = initialState;
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  describe('checkAuthAction', () => {
    it('should set isLoading to true while pending', () => {
      expect(userProcess.reducer(state, { type: loginAction.pending.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.Unknown,
          userInfo: null,
          favoriteFilms: [],
          isLoading: true
        });
    });

    it('should set authorizationStatus and userInfo if fulfilled', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.fulfilled.type, payload: userInfo }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: userInfo,
          favoriteFilms: [],
          isLoading: false
        });
    });

    it('should set authorizationStatus to NoAuth if rejected', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.rejected.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          userInfo: null,
          favoriteFilms: [],
          isLoading: false
        });
    });

    it('should set authorizationStatus to NoAuth and isLoading to false if rejected', () => {
      expect(userProcess.reducer(state, { type: loginAction.rejected.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          userInfo: null,
          favoriteFilms: [],
          isLoading: false
        });
    });
  });

  describe('loginAction', () => {
    it('should set isLoading to true while pending', () => {
      expect(userProcess.reducer(state, { type: loginAction.pending.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.Unknown,
          userInfo: null,
          favoriteFilms: [],
          isLoading: true
        });
    });

    it('should set authorizationStatus, userInfo and isLoading to true if fulfilled', () => {
      expect(userProcess.reducer(state, { type: loginAction.fulfilled.type, payload: userInfo }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: userInfo,
          favoriteFilms: [],
          isLoading: false
        });
    });

    it('should set authorizationStatus to NoAuth and isLoading to false if rejected', () => {
      expect(userProcess.reducer(state, { type: loginAction.rejected.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          userInfo: null,
          favoriteFilms: [],
          isLoading: false
        });
    });
  });

  describe('logoutAction', () => {
    it('should reset state if fulfilled', () => {
      expect(userProcess.reducer(state, { type: logoutAction.fulfilled.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          userInfo: null,
          favoriteFilms: [],
          isLoading: false
        });
    });
  });

  describe('getFavoriteFilmsAction', () => {
    it('should set favoriteFilms if fulfilled', () => {
      expect(userProcess.reducer(state, { type: getFavoriteFilmsAction.fulfilled.type, payload: favoriteFilms }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.Unknown,
          userInfo: null,
          favoriteFilms: favoriteFilms,
          isLoading: false
        });
    });
  });

  describe('changeFavoriteStatusAction', () => {
    let stateWithFavoriteFilms: UserProcess;

    beforeEach(() => {
      stateWithFavoriteFilms = {
        authorizationStatus: AuthorizationStatus.Unknown,
        userInfo: null,
        favoriteFilms: [{ ...film, isFavorite: true }],
        isLoading: false
      };
    });

    it('should add film to favoriteFilms if fulfilled', () => {
      expect(userProcess.reducer(state, {
        type: changeFavoriteStatusAction.fulfilled.type,
        payload: { ...film, isFavorite: true }
      }))
        .toEqual(stateWithFavoriteFilms);
    });

    it('should remove film from favoriteFilms if fulfilled', () => {
      expect(userProcess.reducer(stateWithFavoriteFilms, {
        type: changeFavoriteStatusAction.fulfilled.type,
        payload: { ...film, isFavorite: false }
      }))
        .toEqual(initialState);
    });
  });
});


