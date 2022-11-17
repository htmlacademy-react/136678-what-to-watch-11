import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import ReviewForm from '../../components/review-form/review-form';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Header from '../../components/header/header';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';

import { Film } from '../../types/film';
import { useAppSelector } from '../../hooks';
import { getFilms } from '../../store/data-process/selectors';

function AddReviewScreen(): JSX.Element {
  const films = useAppSelector(getFilms);

  const params = useParams();
  const film = films.find((item: Film) => String(item.id) === params.id);

  if (film === undefined) {
    return <NotFoundScreen />;
  }

  return (
    <section className="film-card film-card--full" style={{ background: film.backgroundColor }}>
      <Helmet>
        <title>WTW. Review</title>
      </Helmet>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header className="film-card--full">
          <Breadcrumbs film={film} />
        </Header>

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
