import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Breadcrumbs from './breadcrumbs';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../const';
import { makeFakeFilm } from '../../utils/mocks';

const film = makeFakeFilm();
const history = createMemoryHistory();

describe('Component: Breadcrumbs', () => {
  beforeEach(() => {
    history.push(`/films/${ film.id }/review`);
  });
  it('should render correctly', () => {
    render(
      <HistoryRouter history={ history }>
        <Breadcrumbs film={ film } />
      </HistoryRouter>
    );

    const linkElement = screen.getByText(film.name);
    const textElement = screen.getByText(/Add review/i);
    expect(linkElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });

  it('should redirect when user click "Film name" link', async () => {
    render(
      <HistoryRouter history={ history }>
        <Routes>
          <Route
            path={ AppRoute.AddReview }
            element={ <Breadcrumbs film={ film } /> }
          />
          <Route
            path={ AppRoute.Film }
            element={ <h1>Mock Film Page Screen</h1> }
          />
        </Routes>
      </HistoryRouter>
    );

    await userEvent.click(screen.getByText(film.name));

    expect(screen.getByText(/Mock Film Page Screen/i)).toBeInTheDocument();
  });
});
