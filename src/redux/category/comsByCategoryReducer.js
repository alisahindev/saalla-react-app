import { GET_COMS_BY_CATEGORY_FAILURE, GET_COMS_BY_CATEGORY_REQUEST, GET_COMS_BY_CATEGORY_SUCCESS } from './actions';
import { GET_ALL_COMMUNITY_REQUEST, GET_ALL_COMMUNITY_SUCCESS, GET_ALL_COMMUNITY_FAILURE } from '../community/actions';

const initialState = {
    data: null,
    error: null,
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case GET_COMS_BY_CATEGORY_REQUEST:
            return { ...state, error: '' };
        case GET_COMS_BY_CATEGORY_SUCCESS:
            return { ...state, data: payload };
        case GET_COMS_BY_CATEGORY_FAILURE:
            return { ...state, error: payload };
        case GET_ALL_COMMUNITY_REQUEST:
            return { ...state, error: '' };
        case GET_ALL_COMMUNITY_SUCCESS:
            return { ...state, data: payload };
        case GET_ALL_COMMUNITY_FAILURE:
            return { ...state, error: payload };
        default:
            return state;
    }
}
