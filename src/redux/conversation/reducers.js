import { GET_CONVERSATIONS_FAILURE, GET_CONVERSATIONS_REQUEST, GET_CONVERSATIONS_SUCCESS } from './actions';

const initialState = {
  data: null,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_CONVERSATIONS_REQUEST:
      return { ...state, error: '' };
    case GET_CONVERSATIONS_SUCCESS:
      return { ...state, data: payload };
    case GET_CONVERSATIONS_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
}
