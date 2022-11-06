import { Film } from '../../types/film';
import { RatingLevel } from '../../const';

type FilmOverviewProps = {
  film: Film;
}

function FilmOverview({ film }: FilmOverviewProps): JSX.Element {
  const {
    rating,
    scoresCount,
    description,
    director,
    starring,
  } = film;

  const actorList = starring.join(', ');

  const getRatingLevel = () => {
    if (rating < 3) {
      return RatingLevel.Bad;
    }
    if (rating < 5) {
      return RatingLevel.Normal;
    }
    if (rating < 8) {
      return RatingLevel.Good;
    }
    if (rating < 10) {
      return RatingLevel.VeryGood;
    }
    if (rating === 10) {
      return RatingLevel.Awesome;
    }
  };

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{ rating }</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{ getRatingLevel() }</span>
          <span className="film-rating__count">{ scoresCount } ratings</span>
        </p>
      </div>
      <div className="film-card__text">
        <p>{ description }</p>
        <p className="film-card__director"><strong>Director: { director }</strong></p>
        <p className="film-card__starring"><strong>Starring: { actorList }</strong></p>
      </div>
    </>
  );
}

export default FilmOverview;
