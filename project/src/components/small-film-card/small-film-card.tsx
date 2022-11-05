import { Link } from 'react-router-dom';

import { Film } from '../../types/film';

type SmallFilmCardProps = {
  film: Film;
  onMouseOver: (id: number) => void;
};

function SmallFilmCard({ film, onMouseOver }: SmallFilmCardProps): JSX.Element {
  const {
    posterImage,
    name,
    id,
  } = film;

  return (
    <article className="small-film-card catalog__films-card" onMouseOver={() => onMouseOver(id)}>
      <div className="small-film-card__image">
        <img src={posterImage} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
