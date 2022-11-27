import { render, screen } from '@testing-library/react';
import FilmOverview from './film-overview';
import { makeFakeFilm } from '../../utils/mocks';

const film = makeFakeFilm();

describe('Component: FilmOverview', () => {
  it('should render correctly', () => {

    render(
      <FilmOverview film={film} />
    );

    const ratingElement = screen.getByText(film.rating);
    const directorElement = screen.getByText(`Director: ${film.director}`);
    const descriptionElement = screen.getByText(film.description);
    const starringElement = screen.getByText(`Starring: ${film.starring.join(', ')}`);
    const scoreElement = screen.getByText(`${film.scoresCount} ratings`);

    expect(ratingElement).toBeInTheDocument();
    expect(directorElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(starringElement).toBeInTheDocument();
    expect(scoreElement).toBeInTheDocument();
  });
});
