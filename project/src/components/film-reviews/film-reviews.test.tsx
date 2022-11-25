import { render, screen } from '@testing-library/react';
import FilmReviews from './film-reviews';
import { makeFakeFilmComment } from '../../utils/mocks';

const reviews = [makeFakeFilmComment()];

describe('Component: FilmReviews', () => {
  it('should render correctly', () => {

    render(
      <FilmReviews reviews={reviews} />
    );

    const review = reviews[0];
    const textElement = screen.getByText(review.comment);
    const userElement = screen.getByText(review.user.name);
    const ratingElement = screen.getByText(review.rating);

    expect(textElement).toBeInTheDocument();
    expect(userElement).toBeInTheDocument();
    expect(ratingElement).toBeInTheDocument();
  });
});
