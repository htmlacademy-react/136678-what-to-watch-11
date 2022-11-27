import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Logo from './logo';
import { AppRoute } from '../../const';
import HistoryRouter from '../history-router/history-router';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  beforeEach(() => {
    history.push(AppRoute.MyList);
  });
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Logo />
      </HistoryRouter>
    );

    const linkElement = screen.getByTestId('logo');
    const wElements = screen.getAllByText(/W/i);
    const tElements = screen.getAllByText(/T/i);

    expect(linkElement).toBeInTheDocument();
    expect(wElements.length).toBe(2);
    expect(tElements.length).toBe(1);
  });

  it('should redirect to Main when user click on Logo', async () => {
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.MyList}
            element={<Logo />}
          />
          <Route
            path={AppRoute.Main}
            element={<h1>Mock Main Page Screen</h1>}
          />
        </Routes>
      </HistoryRouter>
    );

    await userEvent.click(screen.getByText('T'));

    expect(screen.getByText(/Mock Main Page Screen/i)).toBeInTheDocument();
  });
});
