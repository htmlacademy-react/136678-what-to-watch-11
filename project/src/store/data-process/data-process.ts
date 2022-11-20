import { createSlice } from '@reduxjs/toolkit';

import { changeFavoriteStatusAction, getFilmsAction, getPromoFilmAction } from '../api-actions';
import { NameSpace } from '../../const';
import { DataProcess } from '../../types/state';

const initialState: DataProcess = {
  films: [],
  promoFilm: null,
  isLoading: false,
};

const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
      })
      .addCase(getFilmsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isLoading = false;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        if (state.promoFilm?.id === action.payload.id) {
          state.promoFilm.isFavorite = action.payload.isFavorite;
        }
      });
  }
});

export { dataProcess };
