import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './app';
import HistoryRouter from '../history-router/history-router';
import { AppRoute, AuthorizationStatus } from '../../const';
import { initialState as initialAppState } from '../../store/app-process/app-process';
import { makeFakeFilm } from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);

const films = Array.from({ length: 10 }, () => makeFakeFilm());
const promoFilm = makeFakeFilm();

const store = mockStore({
  APP: initialAppState,
  DATA: { films: films, promoFilm: promoFilm, isLoading: false },
  FILM: { film: promoFilm, similarFilms: films, filmComments: [], isLoading: false },
  USER: { authorizationStatus: AuthorizationStatus.NoAuth, userInfo: null, favoriteFilms: films, isLoading: false, },
});

const authStore = mockStore({
  APP: initialAppState,
  DATA: { films: films, promoFilm: promoFilm, isLoading: false },
  FILM: { film: promoFilm, similarFilms: films, filmComments: [], isLoading: false },
  USER: { authorizationStatus: AuthorizationStatus.Auth, userInfo: null, favoriteFilms: films, isLoading: false, },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={ store }>
    <HistoryRouter history={ history }>
      <App />
    </HistoryRouter>
  </Provider>
);

const authFakeApp = (
  <Provider store={ authStore }>
    <HistoryRouter history={ history }>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render "Main screen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(`${ promoFilm.name }`)).toBeInTheDocument();
    expect(screen.getByText(`${ films[0].name }`)).toBeInTheDocument();
    expect(screen.getByText('Show more')).toBeInTheDocument();
  });

  it('should render "Sign-in screen" when no auth user navigate to "/login"', () => {
    history.push('/login');

    render(fakeApp);

    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render "Main screen" when auth user navigate to "/login"', () => {
    history.push('/login');

    render(authFakeApp);

    expect(screen.getByText(`${ promoFilm.name }`)).toBeInTheDocument();
    expect(screen.getByText(`${ films[0].name }`)).toBeInTheDocument();
    expect(screen.getByText('Show more')).toBeInTheDocument();
  });

  it('should render "My list screen" when auth user navigate to "/MyList"', () => {
    history.push(AppRoute.MyList);

    render(authFakeApp);

    expect(screen.getByText(`${ films[0].name }`)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render "Film screen" when user navigate to "/films/filmId"', () => {
    history.push(AppRoute.Film);
    window.scrollTo = jest.fn();

    render(authFakeApp);

    expect(screen.getByText(`${ promoFilm.name }`)).toBeInTheDocument();
    expect(screen.getByText(`${ promoFilm.description }`)).toBeInTheDocument();
    expect(screen.getByText(`${ promoFilm.rating }`)).toBeInTheDocument();
  });

  it('should render "Player screen" when user navigate to "/films/filmId"', () => {
    history.push(`${ AppRoute.Player }`);

    render(fakeApp);

    expect(screen.getByText(`${ promoFilm.name }`)).toBeInTheDocument();
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
  });

  it('should render "Add review screen" when auth user navigate to "/films/filmId/review"', () => {
    history.push(AppRoute.AddReview);

    render(authFakeApp);

    expect(screen.getByText(`${ promoFilm.name }`)).toBeInTheDocument();
  });

  it('should render "Sign in screen" when no auth user navigate to "/films/filmId/review"', () => {
    history.push(AppRoute.AddReview);

    render(fakeApp);

    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render "Not found screen" when user navigate to unknown route', () => {
    history.push('/unknown-route');

    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
