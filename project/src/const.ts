export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
  NotFound = '*',
}

export enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite',
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

export enum NameSpace {
  App = 'APP',
  Data = 'DATA',
  Film = 'FILM',
  User = 'USER',
}

export enum CommentLength {
  Min = 50,
  Max = 500,
}

export const DEFAULT_GENRE_FILTER = 'All genres';

export const SIMILAR_FILM_COUNT = 4;
export const DEFAULT_SHOWN_FILMS_COUNT = 8;
export const MINUTES_IN_HOUR = 60;
