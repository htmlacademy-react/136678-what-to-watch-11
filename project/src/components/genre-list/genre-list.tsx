import React from 'react';
import { useAppDispatch } from '../../hooks';
import { changeFilter, resetFilmsCount } from '../../store/action';

type GenreListProps = {
  activeGenre: string;
  genres: string[];
}

function GenreList({ activeGenre, genres }: GenreListProps) {
  const dispatch = useAppDispatch();

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li key={genre} className={`catalog__genres-item${activeGenre === genre ? ' catalog__genres-item--active' : ''}`}>
          <a onClick={
            (evt) => {
              evt.preventDefault();
              dispatch(changeFilter(genre));
              dispatch(resetFilmsCount());
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
