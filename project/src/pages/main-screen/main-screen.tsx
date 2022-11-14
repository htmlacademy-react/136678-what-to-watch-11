import { Helmet } from 'react-helmet-async';

import Logo from '../../components/logo/logo';
import FilmsList from '../../components/films-list/films-list';
import GenreList from '../../components/genre-list/genre-list';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import UserBlock from '../../components/user-block/user-block';
import FilmButtons from '../../components/film-buttons/film-buttons';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { DEFAULT_GENRE_FILTER } from '../../const';
import { incFilmsCount } from '../../store/action';

function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const { films, genreFilter, filmsCount, promoFilm } = useAppSelector((state) => state);

  const filteredFilms = genreFilter === DEFAULT_GENRE_FILTER
    ? films
    : films.filter((film) => film.genre === genreFilter);

  const handleMoreButtonClick = () => {
    dispatch(incFilmsCount());
  };

  return (
    <>
      <section className="film-card">
        <Helmet>
          <title>WTW. What to Watch</title>
        </Helmet>
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo/>

          <UserBlock />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage} alt={ promoFilm.name } width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{ promoFilm.name }</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{ promoFilm.genre }</span>
                <span className="film-card__year">{ promoFilm.released }</span>
              </p>

              <FilmButtons film={promoFilm} />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList/>

          <FilmsList films={ filteredFilms.slice(0, filmsCount) }/>

          { ((filteredFilms.length - filmsCount) > 0) && <ShowMoreButton onClick={ handleMoreButtonClick }/> }
        </section>

        <footer className="page-footer">
          <Logo light/>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MainScreen;
