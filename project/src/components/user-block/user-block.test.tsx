import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import UserBlock from './user-block';
import HistoryRouter from '../history-router/history-router';
import { makeFakeUser } from '../../utils/mocks';
import { AppRoute, AuthorizationStatus,} from '../../const';

const userInfo = makeFakeUser();
const history = createMemoryHistory();

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.NoAuth, userInfo: null, favoriteFilms: [], isLoading: false, },
});

const storeWithAuth = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.Auth, userInfo: userInfo, favoriteFilms: [], isLoading: false, },
});

describe('Component: UserBlock', () => {
  beforeEach(() => {
    history.push(AppRoute.Main);
  });

  describe('UserBlock without authorization', () => {
    it('should render correctly', () => {

      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <UserBlock />
          </HistoryRouter>
        </Provider>
      );

      const linkElement = screen.getByText(/Sign in/i);
      expect(linkElement).toBeInTheDocument();
    });

    it('should redirect to login page when user click on "Sign-in"', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Routes>
              <Route
                path={AppRoute.Main}
                element={<UserBlock />}
              />
              <Route
                path={AppRoute.SignIn}
                element={<h1>Mock Login Screen</h1>}
              />
            </Routes>
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByText(/Sign in/i));
      expect(screen.getByText(/Mock Login Screen/i)).toBeInTheDocument();
    });
  });

  describe('UserBlock with authorization', () => {
    it('should render correctly', () => {
      render(
        <Provider store={storeWithAuth}>
          <HistoryRouter history={history}>
            <UserBlock />
          </HistoryRouter>
        </Provider>
      );

      const avatarElement = screen.getByAltText('User avatar');
      expect(avatarElement).toBeInTheDocument();

      const linkElement = screen.getByText(/Sign out/i);
      expect(linkElement).toBeInTheDocument();
    });

    it('should redirect to My list page when user click on "Avatar"', async () => {
      render(
        <Provider store={storeWithAuth}>
          <HistoryRouter history={history}>
            <Routes>
              <Route
                path={AppRoute.Main}
                element={<UserBlock />}
              />
              <Route
                path={AppRoute.MyList}
                element={<h1>Mock My list Screen</h1>}
              />
            </Routes>
          </HistoryRouter>
        </Provider>
      );

      const avatarElement = screen.getByAltText('User avatar');
      await userEvent.click(avatarElement);

      expect(screen.getByText(/Mock My list Screen/i)).toBeInTheDocument();
    });

    it('should call Logout action when user click on "Sign out"', async () => {

      render(
        <Provider store={storeWithAuth}>
          <HistoryRouter history={history}>
            <UserBlock />
          </HistoryRouter>
        </Provider>
      );
      const linkElement = screen.getByText('Sign out');
      await userEvent.click(linkElement);

      const actions = storeWithAuth.getActions();
      expect(actions[0].type).toBe('logoutAction/pending');
    });
  });
});
