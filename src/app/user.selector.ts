
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './reducers'; // تأكد من استيراد AppState بشكل صحيح

export const selectAppState = createFeatureSelector<AppState>('appState');

export const selectUsersByPage = (page: number) =>
  createSelector(selectAppState, (state: AppState) => {
    return state && state.users ? state.users[page] || [] : []; // تحقق من وجود state و users
  });
