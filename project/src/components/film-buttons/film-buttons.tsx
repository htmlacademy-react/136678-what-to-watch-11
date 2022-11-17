import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Film } from '../../types/film';
import { useAppSelector } from '../../hooks';
import { getFavoriteFilms } from '../../store/user-process/selector';

type FilmButtonsProps = {
  film: Film;
  showReviewButton?: boolean;
}

function FilmButtons({ film, showReviewButton }: FilmButtonsProps): JSX.Element {
  const navigate = useNavigate();
  const favoriteFilms = useAppSelector(getFavoriteFilms);

  const handleMyListButtonClick = () => {
    const path = '/mylist';
    navigate(path);
  };

  const handlePlayButtonClick = () => {
    const path = '/player/:1';
    navigate(path);
  };

  return (
    <div className="film-card__buttons">
      <button className="btn btn--play film-card__button" type="button" onClick={handlePlayButtonClick}>
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </button>
      <button className="btn btn--list film-card__button" type="button" onClick={handleMyListButtonClick}>
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>
        <span>My list</span>
        <span className="film-card__count">{favoriteFilms?.length}</span>
      </button>
      {showReviewButton && (
        <Link to={`/films/${film?.id}/review`} className="btn film-card__button">Add review</Link>
      )}
    </div>
  );
}

export default FilmButtons;
