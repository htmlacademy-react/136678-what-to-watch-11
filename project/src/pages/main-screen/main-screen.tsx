import React from 'react';
import { Helmet } from 'react-helmet-async';

import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import FilmsList from '../../components/films-list/films-list';
import GenreList from '../../components/genre-list/genre-list';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import FilmButtons from '../../components/film-buttons/film-buttons';
import Spinner from '../../components/spinner/spinner';

import { getGenreFilter, getShownFilmsCount } from '../../store/app-process/selectors';
import {
  getFilmsDataLoadingStatus,
  getFilteredFilms,
  getGenreList,
  getPromoFilm
} from '../../store/data-process/selectors';
import { incFilmsCount } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks';

function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const promoFilm = useAppSelector(getPromoFilm);
  const genres = useAppSelector(getGenreList);
  const activeGenre = useAppSelector(getGenreFilter);
  const filmsCount = useAppSelector(getShownFilmsCount);
  const filteredFilms = useAppSelector(getFilteredFilms);
  const isLoading = useAppSelector(getFilmsDataLoadingStatus);

  const handleMoreButtonClick = () => {
    dispatch(incFilmsCount());
  };

  return (
    <>
      <Spinner isLoading={isLoading} />
      <section className="film-card">
        <Helmet>
          <title>WTW. What to Watch</title>
        </Helmet>
        <div className="film-card__bg">
          <img src={ promoFilm?.backgroundImage } alt={ promoFilm?.name }/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header className="film-card__head" />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={ promoFilm?.posterImage } alt={ promoFilm?.name } width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{ promoFilm?.name }</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{ promoFilm?.genre }</span>
                <span className="film-card__year">{ promoFilm?.released }</span>
              </p>

              {promoFilm && (<FilmButtons film={ promoFilm }/>)}
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList activeGenre={ activeGenre } genres={ genres }/>

          <FilmsList films={ filteredFilms.slice(0, filmsCount) }/>

          { ((filteredFilms.length - filmsCount) > 0) && <ShowMoreButton onClick={ handleMoreButtonClick }/> }
        </section>

        <Footer/>
      </div>
    </>
  );
}

export default MainScreen;
