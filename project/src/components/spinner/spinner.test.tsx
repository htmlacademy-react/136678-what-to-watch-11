import { render, screen } from '@testing-library/react';

import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('should render correctly', () => {

    render(
      <Spinner isLoading />
    );

    const textElement = screen.getByText('Spinner');

    expect(textElement).toBeInTheDocument();
  });
});
