import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import PrivateRoute from '../private-route/private-route';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';

import { getAuthorizationLoadingStatus, getAuthorizationStatus } from '../../store/user-process/selector';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthStatusLoading = useAppSelector(getAuthorizationLoadingStatus);

  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen />}
        />

        <Route
          path={AppRoute.Film}
          element={<FilmScreen />}
        />

        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              isLoading={isAuthStatusLoading}
            >
              <AddReviewScreen />
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.Player}
          element={<PlayerScreen />}
        />

        <Route
          path={AppRoute.SignIn}
          element={<SignInScreen />}
        />

        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              isLoading={isAuthStatusLoading}
            >
              <MyListScreen />
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.NotFound}
          element={<NotFoundScreen />}
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
