import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="user-page">
      <Helmet>
        <title>WTW. Page not found</title>
      </Helmet>
      <Header />
      <section className="page-content">
        <h2 className="page-title">404. Page not found</h2>
        <Link to="/" className="user-block__link">Вернуться на главную</Link>
      </section>

      <Footer />
    </div>
  );
}

export default NotFoundScreen;
