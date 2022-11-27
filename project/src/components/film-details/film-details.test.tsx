import { render, screen } from '@testing-library/react';
import FilmDetails from './film-details';
import { makeFakeFilm } from '../../utils/mocks';

const film = makeFakeFilm();

describe('Component: FilmDetails', () => {
  it('should render correctly', () => {
    render(
      <FilmDetails film={film} />
    );

    const element = screen.getByTestId('film-details');
    expect(element).toBeInTheDocument();

    const textDirectorElement = screen.getByText(film.director);
    expect(textDirectorElement).toBeInTheDocument();

    const textGenreElement = screen.getByText(film.genre);
    expect(textGenreElement).toBeInTheDocument();

    const starringElement = screen.getByText(film.starring.join(', '));
    expect(starringElement).toBeInTheDocument();

    const textReleasedElement = screen.getByText(film.released);
    expect(textReleasedElement).toBeInTheDocument();
  });
});
