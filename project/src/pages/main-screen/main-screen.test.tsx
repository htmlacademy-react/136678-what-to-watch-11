import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';

import MainScreen from './main-screen';
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
  DATA: { films: films, promoFilm: promoFilm, isLoading: false },
  USER: { authorizationStatus: AuthorizationStatus.NoAuth, userInfo: null, favoriteFilms: [], isLoading: false, },
});

describe('Component: Main screen', () => {
  beforeEach(() => {
    history.push(AppRoute.Main);
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MainScreen />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    const titleElement = screen.getByText('WTW');
    expect(titleElement).toBeInTheDocument();
  });

  it('should dispatch showMoreFilms when user click on "Show more"', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={AppRoute.Main}
                element={<MainScreen />}
              />
              <Route
                path={`/player/${promoFilm.id}`}
                element={<h1>Mock Player Screen</h1>}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    const buttonElement = screen.getByText('Show more');
    await userEvent.click(buttonElement);

    const actions = store.getActions();
    expect(actions[0].type).toBe('incFilmsCount');
  });
});
