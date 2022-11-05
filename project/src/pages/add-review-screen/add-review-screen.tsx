import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Logo from '../../components/logo/logo';
import { AppRoute } from '../../const';
import ReviewForm from '../../components/review-form/review-form';
import { Film } from '../../types/film';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type AddReviewScreenProps = {
  films: Film[];
}

function AddReviewScreen({ films }: AddReviewScreenProps): JSX.Element {
  const params = useParams();
  const film = films.find((item: Film) => String(item.id) === params.id);

  if (film === undefined) {
    return <NotFoundScreen />;
  }

  return (
    <section className="film-card film-card--full">
      <Helmet>
        <title>WTW. Review</title>
      </Helmet>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel"/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

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

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </li>
            <li className="user-block__item">
              <Link className="user-block__link" to={AppRoute.Main}>Sign out</Link>
            </li>
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film?.posterImage} alt={film?.name} width="218" height="327"/>
        </div>
      </div>

      <div className="add-review">
        <ReviewForm />
      </div>
    </section>
  );
}

export default AddReviewScreen;
