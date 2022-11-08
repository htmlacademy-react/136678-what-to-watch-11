import { Film } from '../../types/film';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFilter } from '../../store/action';
import { DEFAULT_GENRE_FILTER } from '../../const';

const getGenreList = (films: Film[]) => [DEFAULT_GENRE_FILTER, ...new Set(films.map((film) => film.genre))];

function GenreList() {
  const dispatch = useAppDispatch();
  const activeGenre = useAppSelector((state) => state.genreFilter);
  const films = useAppSelector((state) => state.films);

  const genres = getGenreList(films);

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li key={genre} className={`catalog__genres-item${activeGenre === genre ? ' catalog__genres-item--active' : ''}`}>
          <a onClick={
            (evt) => {
              evt.preventDefault();
              dispatch(changeFilter(genre));
            }
          } className="catalog__genres-link"
          >
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default GenreList;
