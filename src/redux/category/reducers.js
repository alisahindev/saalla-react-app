import { GET_CATEGORIES_FAILURE, GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS } from './actions';

const initialState = {
  data: null,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_CATEGORIES_REQUEST:
      return { ...state, error: '' };
    case GET_CATEGORIES_SUCCESS:
      return { ...state, data: payload };
    case GET_CATEGORIES_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
}
