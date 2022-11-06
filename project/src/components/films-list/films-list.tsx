import { useState } from 'react';

import { Film } from '../../types/film';
import SmallFilmCard from '../small-film-card/small-film-card';

type FilmsListProps = {
  films: Film[];
}

function FilmsList({ films }: FilmsListProps): JSX.Element {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className="catalog__films-list">
      {films.map((film: Film) => (
        <SmallFilmCard
          key={film.id}
          film={film}
          isActive={activeId === film.id}
          setActiveId={setActiveId}
        />
      ))}
    </div>
  );
}

export default FilmsList;
