import dayjs from 'dayjs';
import { Review } from '../../types/review';

type FilmReviewsProps = {
  reviews: Review[];
}

function FilmReviews({ reviews }: FilmReviewsProps): JSX.Element {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews?.map((item) => (
          <div key={item.id} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{item.comment}</p>
              <footer className="review__details">
                <cite className="review__author">{item.user.name}</cite>
                <time className="review__date" dateTime={item.date}>{dayjs(item.date).format('MMMM D, YYYY')}</time>
              </footer>
            </blockquote>
            <div className="review__rating">{item.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilmReviews;
