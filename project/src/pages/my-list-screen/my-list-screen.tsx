import { Helmet } from 'react-helmet-async';

import Logo from '../../components/logo/logo';
import FilmsList from '../../components/films-list/films-list';
import UserBlock from '../../components/user-block/user-block';

import { useAppSelector } from '../../hooks';

function MyListScreen(): JSX.Element {
  const { films } = useAppSelector((state) => state);

  return (
    <div className="user-page">
      <Helmet>
        <title>WTW. Favorite</title>
      </Helmet>
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmsList films={films} />
      </section>

      <footer className="page-footer">
        <Logo light />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MyListScreen;
