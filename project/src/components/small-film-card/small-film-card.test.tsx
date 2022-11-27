import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import SmallFilmCard from './small-film-card';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../const';
import { makeFakeFilm } from '../../utils/mocks';

const history = createMemoryHistory();
const film = makeFakeFilm();

describe('Component: SmallFilmCard', () => {
  beforeEach(() => {
    history.push(AppRoute.Main);
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', () => {
    render(
      <HistoryRouter history={ history }>
        <SmallFilmCard film={ film } isActive={ false } setActiveId={ jest.fn } />
      </HistoryRouter>
    );

    const titleElement = screen.getByText(film.name);
    expect(titleElement).toBeInTheDocument();

    const videoElement = screen.getByTestId(`video-${ film.id }`);
    expect(videoElement).toBeInTheDocument();
  });

  it('when user click on "Film card" should redirect', async () => {
    render(
      <HistoryRouter history={ history }>
        <Routes>
          <Route
            path={ AppRoute.Main }
            element={ <SmallFilmCard film={ film } isActive={ false } setActiveId={ jest.fn } /> }
          />
          <Route
            path={ AppRoute.Film }
            element={ <h1>Mock Film Screen</h1> }
          />
        </Routes>
      </HistoryRouter>
    );

    await userEvent.click(screen.getByTestId(`video-${ film.id }`));

    expect(screen.getByText(/Mock Film Screen/i)).toBeInTheDocument();
  });
});
