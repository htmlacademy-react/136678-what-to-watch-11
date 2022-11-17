import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getGenreFilter = (state: State): string => state[NameSpace.App].genreFilter;

export const getShownFilmsCount = (state: State): number => state[NameSpace.App].shownFilmsCount;
