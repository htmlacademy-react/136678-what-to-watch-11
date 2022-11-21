import { Fragment, useState, SyntheticEvent, FormEvent, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { addReviewAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';
import { APIRoute } from '../../const';
import { NewComment } from '../../types/comment';

type ReviewProps = {
  comment: string;
  rating: null | number;
}

function ReviewForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [formState, setFormState] = useState<ReviewProps>({
    comment: '',
    rating: null
  });

  const isValid = useMemo(() =>
    formState.rating && formState.comment.length >= 50 && formState.comment.length <= 400,
  [formState.comment.length, formState.rating]);

  const handleFormChange = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLTextAreaElement | HTMLInputElement;
    if (target.name === 'review-text') {
      setFormState({...formState, comment: target.value});
    }
    if (target.name === 'rating') {
      setFormState({...formState, rating: parseInt(target.value, 10)});
    }
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const review: NewComment = {
      rating: Number(formState.rating),
      comment: formState.comment,
    };

    if (params.id && isValid) {
      dispatch(addReviewAction([params.id, review])).then((data) => {
        if (data.payload) {
          navigate(`${APIRoute.Films}/${String(params.id)}`);
        }
      });
    }
  };

  const starsList = Array.from({length: 10}, (_, i) => {
    const key = String(10 - i);
    return (
      <Fragment key={key}>
        <input className="rating__input" id={`star-${key}`} type="radio" name="rating" value={`${key}`} />
        <label className="rating__label" htmlFor={`star-${key}`}>{`Rating ${key}`}</label>
      </Fragment>);
  });

  return (
    <form action="#" className="add-review__form" onChange={handleFormChange} onSubmit={handleFormSubmit}>
      <div className="rating">
        <div className="rating__stars">
          {starsList}
        </div>
      </div>

      <div className="add-review__text" style={{backgroundColor: '#FFFFFF', opacity: '65%'}}>
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          defaultValue={formState.comment}
          required
        />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={!isValid}>Post</button>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
