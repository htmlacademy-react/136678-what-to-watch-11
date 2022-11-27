import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';

import MyListScreen from './my-list-screen';
import HistoryRouter from '../../components/history-router/history-router';
import { AppRoute, AuthorizationStatus } from '../../const';
import { makeFakeFilm } from '../../utils/mocks';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

const films = Array.from({ length: 10 }, () => makeFakeFilm());

const store = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.NoAuth, userInfo: null, favoriteFilms: films, isLoading: false, },
});

describe('Component: MyListScreen', () => {
  beforeEach(() => {
    history.push(AppRoute.MyList);
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MyListScreen />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    const titleElement = screen.getByText('My list');
    expect(titleElement).toBeInTheDocument();

    const filmsAmountElement = screen.getByText(films.length);
    expect(filmsAmountElement).toBeInTheDocument();
  });
});
