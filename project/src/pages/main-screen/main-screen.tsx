import { Helmet } from 'react-helmet-async';

import Logo from '../../components/logo/logo';
import FilmsList from '../../components/films-list/films-list';
import GenreList from '../../components/genre-list/genre-list';
import ShowMoreButton from '../../components/show-more-button/show-more-button';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { DEFAULT_GENRE_FILTER } from '../../const';
import { incFilmsCount } from '../../store/action';

type MainScreenProps = {
  filmPromo: {
    name: string;
    genre: string;
    released: number;
  };
}

function MainScreen({ filmPromo }: MainScreenProps): JSX.Element {
  const dispatch = useAppDispatch();

  const { films, genreFilter, filmsCount } = useAppSelector((state) => state);

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
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel"/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo/>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt={ filmPromo.name } width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{ filmPromo.name }</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{ filmPromo.genre }</span>
                <span className="film-card__year">{ filmPromo.released }</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
              </div>
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
