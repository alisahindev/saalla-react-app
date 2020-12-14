import { GET_PROFILE_POSTS_FAILURE, GET_PROFILE_POSTS_REQUEST, GET_PROFILE_POSTS_SUCCESS } from './actions';

const initialState = {
    data: null,
    error: null,
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case GET_PROFILE_POSTS_REQUEST:
            return { ...state, error: '' };
        case GET_PROFILE_POSTS_SUCCESS:
            return { ...state, data: payload };
        case GET_PROFILE_POSTS_FAILURE:
            return { ...state, error: payload };
        default:
            return state;
    }
}
