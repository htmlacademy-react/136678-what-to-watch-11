import { Fragment, useState, SyntheticEvent } from 'react';

type ReviewProps = {
  comment: string;
  rating: null | number;
}


function ReviewForm(): JSX.Element {
  const [formState, setFormState] = useState<ReviewProps>({
    comment: '',
    rating: null
  });

  const handleFormChange = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLTextAreaElement | HTMLInputElement;
    if (target.name === 'review-text') {
      setFormState({...formState, comment: target.value});
    }
    if (target.name === 'rating') {
      setFormState({...formState, rating: parseInt(target.value, 10)});
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
    <form action="#" className="add-review__form" onChange={handleFormChange}>
      <div className="rating">
        <div className="rating__stars">
          {starsList}
        </div>
      </div>

      <div className="add-review__text" style={{backgroundColor: '#FFFFFF', opacity: '65%'}}>
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" defaultValue={formState.comment} />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
