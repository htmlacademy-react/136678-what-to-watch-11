import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';

import ReviewForm from './review-form';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../const';
import { makeFakeFilm } from '../../utils/mocks';

const film = makeFakeFilm();
const history = createMemoryHistory();

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  FILM: { film: film, similarFilms: [], filmComments: [], isLoading: false },
});

describe('Component: ReviewForm', () => {
  beforeEach(() => {
    history.push(AppRoute.AddReview);
  });

  it('should render correctly', () => {
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <ReviewForm filmId={ String(film.id) } />
        </HistoryRouter>
      </Provider>
    );

    const element = screen.getByTestId('review-form');
    expect(element).toBeInTheDocument();

    const reviewTextareaElement = screen.getByPlaceholderText(/Review text/i);
    expect(reviewTextareaElement).toBeInTheDocument();
  });

  it('should dispatch addReviewAction when user typted correct data and click on "Post"', async () => {
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <ReviewForm filmId={ String(film.id) } />
        </HistoryRouter>
      </Provider>
    );

    const starElement = screen.getByText(/Rating 10/i);
    await userEvent.click(starElement);

    const commentElement = screen.getByPlaceholderText(/Review text/i);
    await userEvent.type(commentElement, 'Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur.');

    const buttonElement = screen.getByText('Post');
    await userEvent.click(buttonElement);

    const actions = store.getActions();
    expect(actions[0].type).toBe('addReviewAction/pending');
  });
});
