import {
  GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS
} from './actions';

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
    default:
      return state;
  }
}
