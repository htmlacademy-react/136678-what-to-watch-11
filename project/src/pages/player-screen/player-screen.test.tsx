import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';

import PlayerScreen from './player-screen';
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

describe('Component: PlayerScreen', () => {
  beforeEach(() => {
    history.push(AppRoute.Player);
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <PlayerScreen />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    const element = screen.getByTestId('player-screen');
    expect(element).toBeInTheDocument();
  });
});
