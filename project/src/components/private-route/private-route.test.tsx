import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from './private-route';
import HistoryRouter from '../history-router/history-router';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PrivateRouter', () => {
  beforeEach(() => {
    history.push('/private');
  });

  it('should render component for public route, when user not authorized', () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.SignIn}
              element={<h1>Public Route</h1>}
            />
            <Route
              path='/private'
              element={
                <PrivateRoute
                  isLoading={false}
                  authorizationStatus={AuthorizationStatus.NoAuth}
                >
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.SignIn}
              element={<h1>Public Route</h1>}
            />
            <Route
              path='/private'
              element={
                <PrivateRoute
                  authorizationStatus={AuthorizationStatus.Auth}
                  isLoading={false}
                >
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });

  it('should render Spinner for public route, when isLoading', () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.SignIn}
              element={<h1>Public Route</h1>}
            />
            <Route
              path='/private'
              element={
                <PrivateRoute
                  isLoading
                  authorizationStatus={AuthorizationStatus.NoAuth}
                >
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Spinner')).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });
});
