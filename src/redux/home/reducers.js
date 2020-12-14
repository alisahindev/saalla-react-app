import {
  GET_HOME_POSTS_REQUEST, GET_HOME_POSTS_FAILURE, GET_HOME_POSTS_SUCCESS,
  GET_UNAUTHORIZED_POSTS_FAILURE, GET_UNAUTHORIZED_POSTS_REQUEST, GET_UNAUTHORIZED_POSTS_SUCCESS,
  SEARCH_FAILURE, SEARCH_REQUEST, SEARCH_SUCCESS
} from './actions';
import { CLEAR_HOME } from '../commonActions';

const initialState = {
  data: { results: [] },
  error: null,
  search: null
};

export const handleNonPaginatedResult = (stateArray, responseArray) => {
  for (let i = 0; i < stateArray.length; i++) {
    for (let x = 0; x < responseArray.length; x++) {
      if (stateArray[i].id == responseArray[x].id) {
        stateArray[i] = responseArray[x]
      }
    }
  }
  return stateArray;
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_HOME_POSTS_REQUEST:
      return { ...state, error: '' };
    case GET_HOME_POSTS_SUCCESS:
      if (payload.isVoted) {
        const results = handleNonPaginatedResult(state.data.results, payload.results);
        payload.results = results;
        return { ...state, data: payload };
      } else {
        const prevPosts1 = state.data.results;
        const newPosts1 = prevPosts1.concat(payload.results);
        payload.results = newPosts1;
        return { ...state, data: payload };
      }
    case GET_HOME_POSTS_FAILURE:
      return { ...state, error: payload };
    case GET_UNAUTHORIZED_POSTS_REQUEST:
      return { ...state, error: '' };
    case GET_UNAUTHORIZED_POSTS_SUCCESS:
      const prevPosts = state.data.results;
      const newPosts = prevPosts.concat(payload.results);
      payload.results = newPosts;
      return { ...state, data: payload };
    case GET_UNAUTHORIZED_POSTS_FAILURE:
      return { ...state, error: payload };
    case SEARCH_REQUEST:
      return { ...state, error: '' };
    case SEARCH_SUCCESS:
      return { ...state, search: payload };
    case SEARCH_FAILURE:
      return { ...state, error: payload };
    case CLEAR_HOME:
      const newData = { results: [] }
      return { ...state, data: newData };
    default:
      return state;
  }
}
