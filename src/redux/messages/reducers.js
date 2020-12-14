import { GET_UNREADS_FAILURE, GET_UNREADS_REQUEST, GET_UNREADS_SUCCESS } from './actions';

const initialState = {
  unreads: null,
  data: null,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_UNREADS_REQUEST:
      return { ...state, error: '' };
    case GET_UNREADS_SUCCESS:
      return { ...state, unreads: payload };
    case GET_UNREADS_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
}
