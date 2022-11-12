import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { REVIEWS } from './mocks/reviews';
import { checkAuthAction, getFilmsAction } from './store/api-actions';
import { store } from './store';
import { getToken } from './services/token';

const FilmCard = {
  Name: 'The Grand Budapest Hotel',
  Genre: 'Drama',
  Released: 2014,
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

if (getToken()) {
  store.dispatch(checkAuthAction());
}

store.dispatch(getFilmsAction());

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        filmPromo={{name: FilmCard.Name, genre: FilmCard.Genre, released: FilmCard.Released}}
        reviews={REVIEWS}
      />
    </Provider>
  </React.StrictMode>,
);
