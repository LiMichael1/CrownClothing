import { createSelector } from 'reselect';

const selectUserReducer = (state) => state.user;

// Only run when user state changes, otherwise returns previous return
export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (user) => user.currentUser
);
