import { createSlice } from '@reduxjs/toolkit';

import { DEFAULT_GENRE_FILTER, DEFAULT_SHOWN_FILMS_COUNT, NameSpace } from '../../const';
import { AppProcess } from '../../types/state';
import { changeFilter, incFilmsCount, resetFilmsCount } from '../action';

const initialState: AppProcess = {
  genreFilter: DEFAULT_GENRE_FILTER,
  shownFilmsCount: DEFAULT_SHOWN_FILMS_COUNT,
};

const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(changeFilter, (state, action) => {
        state.genreFilter = action.payload;
      })
      .addCase(incFilmsCount, (state) => {
        state.shownFilmsCount += DEFAULT_SHOWN_FILMS_COUNT;
      })
      .addCase(resetFilmsCount, (state) => {
        state.shownFilmsCount = DEFAULT_SHOWN_FILMS_COUNT;
      });
  }
});

export { appProcess };
