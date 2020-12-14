import { GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS } from './actions';

const initialState = {
    data: null,
    error: null,
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case GET_USERS_REQUEST:
            return { ...state, error: '' };
        case GET_USERS_SUCCESS:
            return { ...state, data: payload };
        case GET_USERS_FAILURE:
            return { ...state, error: payload };
        default:
            return state;
    }
}
