import { Film } from '../../types/film';
import { MINUTES_IN_HOUR } from '../../const';

type FilmDetailsProps = {
  film: Film;
}

function FilmDetails({ film }: FilmDetailsProps): JSX.Element {
  const {
    director,
    starring,
    genre,
    released,
    runTime
  } = film;

  const actorList = starring.join(', ');
  const filmDuration = `${Math.floor(runTime / MINUTES_IN_HOUR)}h ${runTime % MINUTES_IN_HOUR}m`;

  return (
    <div className="film-card__text film-card__row" data-testid="film-details">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">{actorList}</span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{filmDuration}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{released}</span>
        </p>
      </div>
    </div>
  );
}

export default FilmDetails;
