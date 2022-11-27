import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import GenreList from './genre-list';
import { initialState } from '../../store/app-process/app-process';
import { AuthorizationStatus, DEFAULT_GENRE_FILTER } from '../../const';
import { makeFakeFilm } from '../../utils/mocks';

const promoFilm = makeFakeFilm();
const films = Array.from({length: 10}, () => makeFakeFilm());
const genres = [DEFAULT_GENRE_FILTER, ...new Set(films.map((film) => film.genre))];
const mockStore = configureMockStore();

const store = mockStore({
  APP: initialState,
  DATA: { films: films, promoFilm: promoFilm, isLoading: false },
  FILM: { film: promoFilm, similarFilms: films, filmComments: [], isLoading: false },
  USER: { authorizationStatus: AuthorizationStatus.NoAuth, userInfo: null, favoriteFilms: films, isLoading: false, },
});

describe('Component: Genre list', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <GenreList activeGenre={genres[0]} genres={genres} />
      </Provider>
    );

    expect(screen.getByText(films[3].genre)).toBeInTheDocument();
  });

  it('should dispatch action when user click on Genre', async () => {
    render(
      <Provider store={store}>
        <GenreList activeGenre={genres[0]} genres={genres}/>
      </Provider>
    );

    await userEvent.click(screen.getByText(films[1].genre));

    const actions = store.getActions();

    expect(actions[0].type).toBe('main/changeFilter');
  });
});
