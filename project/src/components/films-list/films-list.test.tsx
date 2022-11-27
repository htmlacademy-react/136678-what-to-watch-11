import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute } from '../../const';

import FilmsList from './films-list';
import { initialState } from '../../store/app-process/app-process';
import { makeFakeFilm } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';

const history = createMemoryHistory();
const film = makeFakeFilm();
const films = Array.from({ length: 10 }, () => makeFakeFilm());

const mockStore = configureMockStore();
const store = mockStore({
  APP: initialState,
  DATA: { films: films, promoFilm: film, isLoading: false },
});

describe('Component: FilmsList', () => {
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
          <FilmsList films={films} />
        </HistoryRouter>
      </Provider>,
    );

    const videoElement = screen.getByTestId('films-list');
    expect(videoElement).toBeInTheDocument();
  });
});
