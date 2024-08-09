import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer, on, createReducer } from '@ngrx/store';
import { user } from '../interfaces/interfaces';
import { GetData } from '../user.action';

export interface AppState {
  users: { [page: number]: user[] }; 
  currentPage: number;
}

export const initialState: AppState = {
  users: {}, 
  currentPage: 0,
};

export const userReducer = createReducer(
  initialState,
  on(GetData, (state, { users, page }) => ({
    ...state,
    users: {
      ...state.users,
      [page]: users, // تخزين بيانات الصفحة بناءً على رقم الصفحة
    },
    currentPage: page,
  }))
);