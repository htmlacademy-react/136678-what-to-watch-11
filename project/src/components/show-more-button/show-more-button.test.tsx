import { render, screen } from '@testing-library/react';
import ShowMoreButton from './show-more-button';

describe('Component: ShowMoreButton', () => {
  it('should render correctly', () => {

    render(
      <ShowMoreButton onClick={() => {}}/>
    );

    const buttonElement = screen.getByText('Show more');
    expect(buttonElement).toBeInTheDocument();
  });
});
