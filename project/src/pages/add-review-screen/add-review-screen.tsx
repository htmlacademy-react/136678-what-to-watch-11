import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import ReviewForm from '../../components/review-form/review-form';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Header from '../../components/header/header';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Spinner from '../../components/spinner/spinner';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilm, getFilmDataLoadingStatus } from '../../store/film-process/selectors';
import { getFilmAction } from '../../store/api-actions';

function AddReviewScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();

  const film = useAppSelector(getFilm);
  const isLoading = useAppSelector(getFilmDataLoadingStatus);

  useEffect(() => {
    if (!isLoading && params?.id && String(film?.id) !== params.id) {
      dispatch(getFilmAction(params.id));
    }
  }, [params?.id, film?.id, dispatch, isLoading]);

  if (!film && !isLoading) {
    return <NotFoundScreen/>;
  }

  return (
    <>
      <Spinner isLoading={isLoading} />
      <section className="film-card film-card--full" style={{ background: film?.backgroundColor }}>
        <Helmet>
          <title>WTW. Review</title>
        </Helmet>
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={film?.backgroundImage} alt={film?.name} />
          </div>

          <h1 className="visually-hidden">WTW. {film?.name} Review</h1>

          <Header>
            {film && (<Breadcrumbs film={film} />)}
          </Header>

          <div className="film-card__poster film-card__poster--small">
            <img src={film?.posterImage} alt={film?.name} width="218" height="327"/>
          </div>
        </div>

        {film && (
          <div className="add-review">
            <ReviewForm filmId={String(film.id)}/>
          </div>
        ) }
      </section>
    </>
  );
}

export default AddReviewScreen;
