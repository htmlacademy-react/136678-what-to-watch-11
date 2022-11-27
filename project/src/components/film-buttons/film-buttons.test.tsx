import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { Routes, Route } from 'react-router-dom';
import FilmButtons from './film-buttons';
import { AppRoute, AuthorizationStatus } from '../../const';

import { makeFakeFilm } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';

const mockStore = configureMockStore([thunk]);

const film = makeFakeFilm();
const history = createMemoryHistory();

const store = mockStore({
  FILM: { film: film, similarFilms: [], filmComments: [], isLoading: false },
  USER: { authorizationStatus: AuthorizationStatus.Auth, userInfo: null, favoriteFilms: [], isLoading: false, },
});

describe('Component: FilmButtons', () => {
  beforeEach(() => {
    history.push(`/films/${film.id}`);
  });
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilmButtons film={film} showReviewButton />
        </HistoryRouter>
      </Provider>
    );

    const playElement = screen.getByText(/Play/i);
    const myListElement = screen.getByText(/My list/i);
    const textElement = screen.getByText(/Add review/i);
    expect(playElement).toBeInTheDocument();
    expect(myListElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });

  it('should redirect when user click "Film name" link', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Film}
              element={<FilmButtons film={film} showReviewButton/>}
            />
            <Route
              path={AppRoute.AddReview}
              element={<h1>Mock AddReview Page Screen</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByText(/Add review/i));

    expect(screen.getByText(/Mock AddReview Page Screen/i)).toBeInTheDocument();
  });
});
