export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum FilmTab {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}

export enum RatingLevel {
  Bad = 'BAD',
  Normal = 'NORMAL',
  Good = 'GOOD',
  VeryGood = 'VERY_GOOD',
  Awesome = 'AWESOME',
}

export const SIMILAR_FILM_COUNT = 4;
