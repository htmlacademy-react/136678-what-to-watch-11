import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { AuthorizationStatus, AppRoute } from '../../const';
import App from './app';
import { initialState } from '../../store/app-process/app-process';
import { makeFakeFilm } from '../../utils/mocks';

const mockStore = configureMockStore();

const films = Array.from({ length: 10 }, () => makeFakeFilm());
const promoFilm = makeFakeFilm();

const store = mockStore({
  APP: initialState,
  DATA: { films: films, promoFilm: promoFilm, isLoading: false },
  FILM: { film: promoFilm, similarFilms: films, filmComments: [], isLoading: false },
  USER: { authorizationStatus: AuthorizationStatus.Auth, userInfo: null, favoriteFilms: films, isLoading: false, },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={ store }>
    <HistoryRouter history={history}>
      <App/>
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

  it('should render "Sign-in screen" when user navigate to "/login"', () => {
    history.push('/login');

    render(fakeApp);
    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
