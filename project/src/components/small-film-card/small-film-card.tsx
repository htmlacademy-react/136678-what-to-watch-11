import { Link } from 'react-router-dom';

import { Film } from '../../types/film';

function SmallFilmCard({ id, title, src }: Film): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={src} alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{title}</Link>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
