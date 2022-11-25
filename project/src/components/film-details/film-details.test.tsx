import { render, screen } from '@testing-library/react';
import FilmDetails from './film-details';
import { makeFakeFilm } from '../../utils/mocks';

const film = makeFakeFilm();

describe('Component: FilmDetails', () => {
  it('should render correctly', () => {

    render(
      <FilmDetails film={film} />
    );

    const textDirectorElement = screen.getByText(film.director);
    const textGenreElement = screen.getByText(film.genre);
    const starringElement = screen.getByText(film.starring.join(', '));
    const textReleasedElement = screen.getByText(film.released);

    expect(textDirectorElement).toBeInTheDocument();
    expect(textGenreElement).toBeInTheDocument();
    expect(starringElement).toBeInTheDocument();
    expect(textReleasedElement).toBeInTheDocument();
  });
});
