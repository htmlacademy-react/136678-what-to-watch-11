import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="user-page">
      <Helmet>
        <title>WTW. Page not found</title>
      </Helmet>
      <header className="page-header user-page__head">
        <Logo />
        <UserBlock />
      </header>
      <section className="page-content">
        <h2 className="page-title">404. Page not found</h2>
        <Link to="/" className="user-block__link">Вернуться на главную</Link>
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

export default NotFoundScreen;
