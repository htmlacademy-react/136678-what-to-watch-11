import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { FILMS } from './mocks/films';
import { REVIEWS } from './mocks/reviews';

const FilmCard = {
  Name: 'The Grand Budapest Hotel',
  Genre: 'Drama',
  Released: 2014,
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App filmPromo={{name: FilmCard.Name, genre: FilmCard.Genre, released: FilmCard.Released}} films={FILMS} reviews={REVIEWS} />
  </React.StrictMode>,
);
