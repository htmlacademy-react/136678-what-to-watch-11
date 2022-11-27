import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';

import FilmScreen from './film-screen';
import HistoryRouter from '../../components/history-router/history-router';
import { AppRoute, AuthorizationStatus } from '../../const';
import { initialState } from '../../store/app-process/app-process';
import { makeFakeFilm } from '../../utils/mocks';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

const promoFilm = makeFakeFilm();
const films = Array.from({ length: 10 }, () => makeFakeFilm());

const store = mockStore({
  APP: initialState,
  FILM: { film: promoFilm, similarFilms: films, filmComments: [], isLoading: false },
  USER: { authorizationStatus: AuthorizationStatus.NoAuth, userInfo: null, favoriteFilms: [], isLoading: false, },
});

describe('Component: Film screen', () => {
  beforeEach(() => {
    history.push(AppRoute.Film);
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', () => {
    window.scrollTo = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <FilmScreen />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    const titleElement = screen.getByText(`WTW. ${promoFilm?.name}`);
    expect(titleElement).toBeInTheDocument();
  });
});
