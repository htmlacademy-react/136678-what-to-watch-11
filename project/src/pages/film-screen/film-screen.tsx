import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import NotFoundScreen from '../not-found-screen/not-found-screen';
import Logo from '../../components/logo/logo';
import FilmTabs from '../../components/film-tabs/film-tabs';
import FilmsList from '../../components/films-list/films-list';
import UserBlock from '../../components/user-block/user-block';
import FilmButtons from '../../components/film-buttons/film-buttons';

import { getFilmAction, getFilmCommentsAction, getSimilarFilmsAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';

function FilmScreen(): JSX.Element | null {
  const dispatch = useAppDispatch();

  const { film, authorizationStatus, similarFilms, isLoading, filmComments } = useAppSelector((state) => state);

  const params = useParams();

  useEffect(() => {
    if (!isLoading && params?.id && String(film?.id) !== params.id) {
      dispatch(getFilmAction(params.id));
      dispatch(getSimilarFilmsAction(params.id));
      dispatch(getFilmCommentsAction(params.id));
    }
  }, [params?.id, film?.id, dispatch, isLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params?.id]);

  if (!film) {
    return <NotFoundScreen />;
  }

  return (
    <>
      <section className="film-card film-card--full" style={{ background: film.backgroundColor }}>
        <Helmet>
          <title>WTW. Film-page</title>
        </Helmet>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film?.backgroundImage} alt={film?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />

            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film?.genre}</span>
                <span className="film-card__year">{film?.released}</span>
              </p>

              <FilmButtons film={film} showReviewButton={authorizationStatus === AuthorizationStatus.Auth} />
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film?.posterImage} alt={film?.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              {film && (<FilmTabs film={film} reviews={filmComments} />)}
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmsList films={similarFilms} />
        </section>

        <footer className="page-footer">
          <Logo light />
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default FilmScreen;
