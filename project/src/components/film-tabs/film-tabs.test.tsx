import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FilmTabs from './film-tabs';
import { makeFakeFilm, makeFakeFilmComment } from '../../utils/mocks';

const film = makeFakeFilm();
const comment = makeFakeFilmComment();

describe('Component: FilmTabs', () => {
  it('should render correctly', () => {
    render(
      <FilmTabs film={ film } reviews={ [comment] } />
    );

    const overviewElement = screen.getByText(/Overview/i);
    const detailsElement = screen.getByText(/Details/i);
    const reviewsElement = screen.getByText(/Reviews/i);

    expect(overviewElement).toBeInTheDocument();
    expect(detailsElement).toBeInTheDocument();
    expect(reviewsElement).toBeInTheDocument();
  });

  it('should show film overview when user click on "Overview" tab', async () => {
    render(
      <FilmTabs film={ film } reviews={ [comment] } />
    );

    await userEvent.click(screen.getByText(/Overview/i));
    expect(screen.getByTestId('Overview')).toHaveClass('film-nav__item--active');

    const overviewElement = screen.getByTestId('film-overview');
    expect(overviewElement).toBeInTheDocument();
  });

  it('should show film details when user click on "Details" tab', async () => {
    render(
      <FilmTabs film={ film } reviews={ [comment] } />
    );

    await userEvent.click(screen.getByText(/Details/i));
    expect(screen.getByTestId('Details')).toHaveClass('film-nav__item--active');

    const detailsElement = screen.getByTestId('film-details');
    expect(detailsElement).toBeInTheDocument();
  });

  it('should show film Reviews when user click on "Reviews" tab', async () => {
    render(
      <FilmTabs film={ film } reviews={ [comment] } />
    );

    await userEvent.click(screen.getByText(/Reviews/i));
    expect(screen.getByTestId('Reviews')).toHaveClass('film-nav__item--active');

    const reviewElement = screen.getByTestId('film-reviews');
    expect(reviewElement).toBeInTheDocument();
  });
});
