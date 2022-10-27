import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import PrivateRoute from '../private-route/private-route';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';

import { AppRoute, AuthorizationStatus } from '../../const';
import { Film } from '../../types/film';

type AppScreenProps = {
  filmPromo: {
    title: string;
    genre: string;
    year: number;
  };
  cards: Film[];
};

function App(props: AppScreenProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainScreen {...props} />}
          />

          <Route
            path={AppRoute.Film}
            element={<FilmScreen />}
          />

          <Route
            path={AppRoute.AddReview}
            element={<AddReviewScreen />}
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
                authorizationStatus={AuthorizationStatus.NoAuth}
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
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;