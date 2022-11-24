import { createSelector } from 'reselect';

const selectCategoriesReducer = (state) => state.categories;

// Only runs when Category State changes, otherwise returns previous return
export const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (
    categories // Converts Array to Map
  ) =>
    categories.reduce((acc, { title, items }) => {
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
