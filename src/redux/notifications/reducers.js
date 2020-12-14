import { GET_NOTIFICATIONS_FAILURE, GET_NOTIFICATIONS_REQUEST, GET_NOTIFICATIONS_SUCCESS } from './actions';

const initialState = {
  data: null,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_NOTIFICATIONS_REQUEST:
      return { ...state, error: '' };
    case GET_NOTIFICATIONS_SUCCESS:
      return { ...state, data: payload };
    case GET_NOTIFICATIONS_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
}
