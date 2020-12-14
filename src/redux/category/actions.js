export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';

export const GET_COMS_BY_CATEGORY_REQUEST = 'GET_COMS_BY_CATEGORY_REQUEST';
export const GET_COMS_BY_CATEGORY_SUCCESS = 'GET_COMS_BY_CATEGORY_SUCCESS';
export const GET_COMS_BY_CATEGORY_FAILURE = 'GET_COMS_BY_CATEGORY_FAILURE';

export const getCategoriesRequest = payload => ({
  type: GET_CATEGORIES_REQUEST,
  payload,
});

export const getComsByCategoryRequest = payload => ({
  type: GET_COMS_BY_CATEGORY_REQUEST,
  payload,
});


