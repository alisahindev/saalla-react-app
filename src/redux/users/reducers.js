import { GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_USER_BY_USERNAME_FAILURE, GET_USER_BY_USERNAME_REQUEST, GET_USER_BY_USERNAME_SUCCESS } from './actions';

const initialState = {
  data: null,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_PROFILE_REQUEST:
      return { ...state, error: '' };
    case GET_PROFILE_SUCCESS:
      return { ...state, data: payload };
    case GET_PROFILE_FAILURE:
      return { ...state, error: payload };
    case GET_USER_BY_USERNAME_REQUEST:
      return { ...state, error: '' };
    case GET_USER_BY_USERNAME_SUCCESS:
      return { ...state, data: payload };
    case GET_USER_BY_USERNAME_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
}
