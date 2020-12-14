import {
    GET_COMMUNITY_FAILURE, GET_COMMUNITY_REQUEST, GET_COMMUNITY_SUCCESS,
    GET_COMMUNITY_POSTS_FAILURE, GET_COMMUNITY_POSTS_REQUEST, GET_COMMUNITY_POSTS_SUCCESS
} from './actions';
import { CLEAR_COMMUNITY } from '../commonActions';
import { handleNonPaginatedResult } from '../home/reducers';
import { DELETE_MODERATOR_SUCCESS } from '../posts/actions';

const initialState = {
    pagedData: { results: [] },
    data: null,
    error: null,
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case GET_COMMUNITY_REQUEST:
            return { ...state, error: '' };
        case GET_COMMUNITY_SUCCESS:
            return { ...state, data: payload };
        case GET_COMMUNITY_FAILURE:
            return { ...state, error: payload };
        case GET_COMMUNITY_POSTS_REQUEST:
            return { ...state, error: '' };
        case GET_COMMUNITY_POSTS_SUCCESS:
            if (payload.isVoted) {
                const results = handleNonPaginatedResult(state.pagedData.results, payload.results);
                payload.results = results;
                return { ...state, pagedData: payload };
            } else {
                const prevPosts1 = state.pagedData.results;
                const newPosts1 = prevPosts1.concat(payload.results);
                payload.results = newPosts1;
                return { ...state, pagedData: payload };
            }
        case GET_COMMUNITY_POSTS_FAILURE:
            return { ...state, error: payload };
        case DELETE_MODERATOR_SUCCESS:
            debugger;
            const temp = [...state.pagedData.results];
            const newTemp = temp.filter(x => x.id !== payload.deletedPost)
            payload.results = newTemp;
            return { ...state, pagedData: payload }
        case CLEAR_COMMUNITY:
            const newState = {
                pagedData: { results: [] },
                data: null,
                error: null,
            }
            return { ...newState };
        default:
            return state;
    }
}
