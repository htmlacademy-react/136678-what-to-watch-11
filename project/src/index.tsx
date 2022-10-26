import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { FILMS } from './mocks/films';

const FilmCard = {
  Title: 'The Grand Budapest Hotel',
  Genre: 'Drama',
  Year: 2014,
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App filmPromo={{title: FilmCard.Title, genre: FilmCard.Genre, year: FilmCard.Year}} cards={FILMS}/>
  </React.StrictMode>,
);
