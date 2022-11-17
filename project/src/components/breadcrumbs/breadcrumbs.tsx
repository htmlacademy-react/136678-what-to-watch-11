import React from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';
import { Film } from '../../types/film';

type BreadcrumbsProps = {
  film: Film;
};

function Breadcrumbs({ film } : BreadcrumbsProps): JSX.Element {
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={`/films/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
        </li>
        <li className="breadcrumbs__item">
          <Link className="breadcrumbs__link" to={AppRoute.AddReview}>Add review</Link>
        </li>
      </ul>
    </nav>
  );
}

export default React.memo(Breadcrumbs);
