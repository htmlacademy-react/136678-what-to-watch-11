import { render, screen } from '@testing-library/react';
import FilmReviews from './film-reviews';
import { makeFakeFilmComment } from '../../utils/mocks';

const reviews = [makeFakeFilmComment()];

describe('Component: FilmReviews', () => {
  it('should render correctly', () => {
    render(
      <FilmReviews reviews={reviews} />
    );

    const element = screen.getByTestId('film-reviews');
    expect(element).toBeInTheDocument();

    const { comment, user, rating } = reviews[0];

    const textElement = screen.getByText(comment);
    expect(textElement).toBeInTheDocument();

    const userElement = screen.getByText(user.name);
    expect(userElement).toBeInTheDocument();

    const ratingElement = screen.getByText(rating);
    expect(ratingElement).toBeInTheDocument();
  });
});
