import { State } from '../../types/state';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserInfo } from '../../types/user-info';
import { Film } from '../../types/film';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getUserInfo = (state: State): UserInfo | null => state[NameSpace.User].userInfo;

export const getFavoriteFilms = (state: State): Film[] => state[NameSpace.User].favoriteFilms;

export const getUserInfoLoadingStatus = (state: State): boolean => state[NameSpace.User].isLoading;
