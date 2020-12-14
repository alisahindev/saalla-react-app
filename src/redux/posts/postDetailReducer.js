import { GET_POST_DETAIL_FAILURE, GET_POST_DETAIL_REQUEST, GET_POST_DETAIL_SUCCESS } from './actions';

const initialState = {
    data: null,
    error: null,
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case GET_POST_DETAIL_REQUEST:
            return { ...state, error: '' };
        case GET_POST_DETAIL_SUCCESS:
            return { ...state, data: payload };
        case GET_POST_DETAIL_FAILURE:
            return { ...state, error: payload };
        default:
            return state;
    }
}
