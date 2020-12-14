import { GET_COUNT_FAILURE, GET_COUNT_REQUEST, GET_COUNT_SUCCESS } from './actions';

const initialState = {
    data: null,
    error: null,
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case GET_COUNT_REQUEST:
            return { ...state, error: '' };
        case GET_COUNT_SUCCESS:
            return { ...state, data: payload };
        case GET_COUNT_FAILURE:
            return { ...state, error: payload };
        default:
            return state;
    }
}
