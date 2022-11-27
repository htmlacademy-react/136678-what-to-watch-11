import { render, screen } from '@testing-library/react';

import FilmOverview from './film-overview';
import { makeFakeFilm } from '../../utils/mocks';

const film = makeFakeFilm();

describe('Component: FilmOverview', () => {
  it('should render correctly', () => {
    render(
      <FilmOverview film={ film } />
    );

    const element = screen.getByTestId('film-overview');
    expect(element).toBeInTheDocument();

    const ratingElement = screen.getByText(film.rating);
    expect(ratingElement).toBeInTheDocument();

    const directorElement = screen.getByText(`Director: ${ film.director }`);
    expect(directorElement).toBeInTheDocument();

    const descriptionElement = screen.getByText(film.description);
    expect(descriptionElement).toBeInTheDocument();

    const starringElement = screen.getByText(`Starring: ${ film.starring.join(', ') }`);
    expect(starringElement).toBeInTheDocument();

    const scoreElement = screen.getByText(`${ film.scoresCount } ratings`);
    expect(scoreElement).toBeInTheDocument();
  });
});
