import {
  GET_MAIN_POSTS_REQUEST, GET_MAIN_POSTS_SUCCESS, GET_MAIN_POSTS_FAILURE,
  GET_USER_POSTS_REQUEST, GET_USER_POSTS_SUCCESS, GET_USER_POSTS_FAILURE, DELETE_MODERATOR_SUCCESS
} from './actions';

const initialState = {
  data: null,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_MAIN_POSTS_REQUEST:
      return { ...state, error: '' };
    case GET_MAIN_POSTS_SUCCESS:
      return { ...state, data: payload };
    case GET_MAIN_POSTS_FAILURE:
      return { ...state, error: payload };
    case GET_USER_POSTS_REQUEST:
      return { ...state, error: '' };
    case GET_USER_POSTS_SUCCESS:
      return { ...state, data: payload };
    case GET_USER_POSTS_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
}
