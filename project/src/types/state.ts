import { store } from '../store';
import { AuthorizationStatus } from '../const';
import { UserInfo } from './user-info';
import { Film } from './film';
import { Comment } from './comment';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserInfo | null;
  favoriteFilms: Film[];
  isLoading: boolean;
};

export type DataProcess = {
  films: Film[];
  promoFilm: Film | null;
  isLoading: boolean;
};

export type FilmProcess = {
  film: Film | null;
  similarFilms: Film[];
  filmComments: Comment[];
  isLoading: boolean;
};

export type AppProcess = {
  genreFilter: string;
  shownFilmsCount: number;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
