import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Footer from './footer';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../const';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  beforeEach(() => {
    history.push(AppRoute.MyList);
  });
  it('should render correctly', () => {
    render(
      <HistoryRouter history={ history }>
        <Footer />
      </HistoryRouter>
    );

    const linkElement = screen.getByTestId('logo');
    const textElement = screen.getByText(/© 2019 What to watch Ltd./i);
    expect(linkElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });

  it('should redirect to Main when user click on Logo', async () => {
    render(
      <HistoryRouter history={ history }>
        <Routes>
          <Route
            path={ AppRoute.MyList }
            element={ <Footer /> }
          />
          <Route
            path={ AppRoute.Main }
            element={ <h1>Mock Main Page Screen</h1> }
          />
        </Routes>
      </HistoryRouter>
    );

    await userEvent.click(screen.getByText('T'));
    expect(screen.getByText(/Mock Main Page Screen/i)).toBeInTheDocument();
  });
});
