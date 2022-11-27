import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { createAPI } from '../services/api';
import {
  addReviewAction,
  changeFavoriteStatusAction,
  checkAuthAction,
  getFavoriteFilmsAction,
  getFilmAction,
  getFilmCommentsAction,
  getFilmsAction,
  getPromoFilmAction,
  getSimilarFilmsAction,
  loginAction,
  logoutAction
} from './api-actions';
import { APIRoute } from '../const';
import { State } from '../types/state';
import { AuthInfo } from '../types/auth-info';
import { makeFakeFilm, makeFakeFilmComment } from '../utils/mocks';
import { Film } from '../types/film';

const film = makeFakeFilm();
const films: Film[] = Array.from({ length: 4 }, makeFakeFilm);
const comment = makeFakeFilmComment();

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>>(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      getFavoriteFilmsAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should authorization status is «noauth» when server return 401', async () => {
    const fakeStore = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(401, { error: 'You are not logged in or you do not have permission to this page.' });

    expect(fakeStore.getActions()).toEqual([]);

    await fakeStore.dispatch(checkAuthAction());

    const actions = fakeStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.rejected.type
    ]);
  });

  it('should dispatch RequriedAuthorization when POST /login', async () => {
    const fakeUser: AuthInfo = { login: 'test@test.ru', password: '123456' };

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, { token: 'secret' });

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      getFavoriteFilmsAction.pending.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('wtw-token', 'secret');
  });

  it('should reject Login if login with error', async () => {
    const fakeUser: AuthInfo = { login: 'test@test', password: '123456' };

    mockAPI
      .onPost(APIRoute.Login)
      .reply(400, {});

    const fakeStore = mockStore();

    await fakeStore.dispatch(loginAction(fakeUser));

    const actions = fakeStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      loginAction.rejected.type
    ]);
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('wtw-token');
  });

  it('should reject Logout when Delete /logout with error', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(400);

    const fakeStore = mockStore();

    await fakeStore.dispatch(logoutAction());

    const actions = fakeStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.rejected.type
    ]);
  });

  it('should dispatch getFavoriteFilmsAction when GET /favorite', async () => {
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, films);

    const fakeStore = mockStore();

    await fakeStore.dispatch(getFavoriteFilmsAction());

    const actions = fakeStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      getFavoriteFilmsAction.pending.type,
      getFavoriteFilmsAction.fulfilled.type
    ]);
  });

  it('should reject getFavoriteFilmsAction when GET /favorite with error', async () => {
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(401, { error: 'You are not logged in or you do not have permission to this page.' });

    const fakeStore = mockStore();

    await fakeStore.dispatch(getFavoriteFilmsAction());

    const actions = fakeStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      getFavoriteFilmsAction.pending.type,
      getFavoriteFilmsAction.rejected.type
    ]);
  });

  it('should dispatch changeFavoriteStatusAction when POST /favorite/filmId/filmStatus', async () => {
    const newStatus = film.isFavorite ? 0 : 1;
    mockAPI
      .onPost(`${ APIRoute.Favorite }/${ film.id }/${ newStatus }`)
      .reply(200, { ...film, isFavorite: newStatus });

    const fakeStore = mockStore();

    await fakeStore.dispatch(changeFavoriteStatusAction({ filmId: film.id, status: newStatus }));

    const actions = fakeStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      changeFavoriteStatusAction.pending.type,
      changeFavoriteStatusAction.fulfilled.type,
    ]);
  });

  it('should reject changeFavoriteStatusAction when POST /favorite/filmId/filmStatus with error', async () => {
    const newStatus = film.isFavorite ? 0 : 1;
    mockAPI
      .onPost(`${ APIRoute.Favorite }/${ film.id }/${ newStatus }`)
      .reply(401, { error: 'You are not logged in or you do not have permission to this page.' });

    const fakeStore = mockStore();

    await fakeStore.dispatch(changeFavoriteStatusAction({ filmId: film.id, status: newStatus }));

    const actions = fakeStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      changeFavoriteStatusAction.pending.type,
      changeFavoriteStatusAction.rejected.type
    ]);
  });

  it('should dispatch getPromoFilmAction when GET /promo', async () => {
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, film);

    const fakeStore = mockStore();

    await fakeStore.dispatch(getPromoFilmAction());

    const actions = fakeStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      getPromoFilmAction.pending.type,
      getPromoFilmAction.fulfilled.type
    ]);
  });

  it('should reject getPromoFilmAction when GET /promo  with error', async () => {
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(404);

    const fakeStore = mockStore();

    await fakeStore.dispatch(getPromoFilmAction());

    const actions = fakeStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      getPromoFilmAction.pending.type,
      getPromoFilmAction.rejected.type
    ]);
  });

  it('should dispatch getFilmsAction when GET /films', async () => {
    mockAPI
      .onGet(APIRoute.Films)
      .reply(200, films);

    const fakeStore = mockStore();

    await fakeStore.dispatch(getFilmsAction());

    const actions = fakeStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      getFilmsAction.pending.type,
      getFilmsAction.fulfilled.type
    ]);
  });

  it('Should reject getFilmsAction when GET /films with error', async () => {
    mockAPI
      .onGet(APIRoute.Films)
      .reply(404);

    const fakeStore = mockStore();

    await fakeStore.dispatch(getSimilarFilmsAction(String(film.id)));

    const actions = fakeStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      getSimilarFilmsAction.pending.type,
      getSimilarFilmsAction.rejected.type
    ]);
  });

  it('should dispatch getFilmAction when GET /film', async () => {
    mockAPI
      .onGet(`${ APIRoute.Films }/${ film.id }`)
      .reply(200, film);

    const fakeStore = mockStore();

    await fakeStore.dispatch(getFilmAction(String(film.id)));

    const actions = fakeStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      getFilmAction.pending.type,
      getFilmAction.fulfilled.type
    ]);
  });

  it('should reject getFilmAction when GET /film with error', async () => {
    mockAPI
      .onGet(`${ APIRoute.Films }/${ film.id }`)
      .reply(404);

    const fakeStore = mockStore();

    await fakeStore.dispatch(getFilmAction(String(film.id)));

    const actions = fakeStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      getFilmAction.pending.type,
      getFilmAction.rejected.type
    ]);
  });

  it('should dispatch getSimilarFilmsAction when GET /films/filmID/similar', async () => {
    mockAPI
      .onGet(`${ APIRoute.Films }/${ film.id }/similar`)
      .reply(200, [film]);

    const fakeStore = mockStore();

    await fakeStore.dispatch(getSimilarFilmsAction(String(film.id)));

    const actions = fakeStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      getSimilarFilmsAction.pending.type,
      getSimilarFilmsAction.fulfilled.type
    ]);
  });

  it('should reject getSimilarFilmsAction when GET /films/filmID/similar with error', async () => {
    mockAPI
      .onGet(`${ APIRoute.Films }/${ film.id }/similar`)
      .reply(404);

    const fakeStore = mockStore();

    await fakeStore.dispatch(getSimilarFilmsAction(String(film.id)));

    const actions = fakeStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      getSimilarFilmsAction.pending.type,
      getSimilarFilmsAction.rejected.type
    ]);
  });

  it('should dispatch getFilmCommentsAction when GET /comments/filmID', async () => {
    mockAPI
      .onGet(`${ APIRoute.Comments }/${ film.id }`)
      .reply(200, comment);

    const fakeStore = mockStore();

    await fakeStore.dispatch(getFilmCommentsAction(String(film.id)));

    const actions = fakeStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      getFilmCommentsAction.pending.type,
      getFilmCommentsAction.fulfilled.type
    ]);
  });

  it('should reject getFilmCommentsAction when GET /comments/filmID with error', async () => {
    mockAPI
      .onGet(`${ APIRoute.Comments }/${ film.id }`)
      .reply(404);

    const fakeStore = mockStore();

    await fakeStore.dispatch(getFilmCommentsAction(String(film.id)));

    const actions = fakeStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      getFilmCommentsAction.pending.type,
      getFilmCommentsAction.rejected.type
    ]);
  });

  it('Should dispatch addReviewAction when POST /comments/filmID', async () => {
    mockAPI
      .onPost(`${ APIRoute.Comments }/${ film.id }`)
      .reply(200, comment);

    const fakeStore = mockStore();

    await fakeStore.dispatch(addReviewAction([String(film.id), { comment: comment.comment, rating: comment.rating }]));

    const actions = fakeStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      addReviewAction.pending.type,
      addReviewAction.fulfilled.type
    ]);
  });

  it('Should reject addReviewAction when POST /comments/filmID with error', async () => {
    mockAPI
      .onPost(`${ APIRoute.Comments }/${ film.id }`)
      .reply(401, { 'error': 'You are not logged in or you do not have permission to this page.' });

    const fakeStore = mockStore();

    await fakeStore.dispatch(addReviewAction([String(film.id), { comment: comment.comment, rating: comment.rating }]));

    const actions = fakeStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      addReviewAction.pending.type,
      addReviewAction.rejected.type
    ]);
  });
});
