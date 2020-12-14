/* import {
  CREATE_COMMENT_FAILURE,CREATE_COMMENT_REQUEST,CREATE_COMMENT_SUCCESS
} from './actions';

const initialState = {
  data: null,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_HOME_POSTS_REQUEST:
      return { ...state, error: '' };
    case GET_HOME_POSTS_SUCCESS:
      return { ...state, data: payload.data };
    case GET_HOME_POSTS_FAILURE:
      return { ...state, error: payload };
    case GET_UNAUTHORIZED_POSTS_REQUEST:
      return { ...state, error: '' };
    case GET_UNAUTHORIZED_POSTS_SUCCESS:
      return { ...state, data: payload };
    case GET_UNAUTHORIZED_POSTS_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
}
 */