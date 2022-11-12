import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { REVIEWS } from './mocks/reviews';
import { fetchFilms } from './store/api-actions';
import { store } from './store';

const FilmCard = {
  Name: 'The Grand Budapest Hotel',
  Genre: 'Drama',
  Released: 2014,
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(fetchFilms());

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
