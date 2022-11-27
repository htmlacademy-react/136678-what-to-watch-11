import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';


import Header from './header';
import HistoryRouter from '../history-router/history-router';
import { AppRoute, AuthorizationStatus } from '../../const';
import { makeFakeUser } from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);

const userInfo = makeFakeUser();
const history = createMemoryHistory();

const store = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.NoAuth, userInfo: userInfo, favoriteFilms: [], isLoading: false, },
});

describe('Component: Header', () => {
  beforeEach(() => {
    history.push(AppRoute.MyList);
  });
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );

    const linkElement = screen.getByTestId('logo');
    const userElement = screen.getByTestId('user-block');
    expect(linkElement).toBeInTheDocument();
    expect(userElement).toBeInTheDocument();
  });

  it('should redirect to Main when user click on Logo', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.MyList}
              element={<Header />}
            />
            <Route
              path={AppRoute.Main}
              element={<h1>Mock Main Page Screen</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByText('T'));

    expect(screen.getByText(/Mock Main Page Screen/i)).toBeInTheDocument();
  });
});
