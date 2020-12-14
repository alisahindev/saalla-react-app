import { GET_CONVERSATION_DETAIL_FAILURE, GET_CONVERSATION_DETAIL_REQUEST, GET_CONVERSATION_DETAIL_SUCCESS } from './actions';

const initialState = {
    data: null,
    error: null,
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case GET_CONVERSATION_DETAIL_REQUEST:
            return { ...state, error: '' };
        case GET_CONVERSATION_DETAIL_SUCCESS:
            return { ...state, data: payload };
        case GET_CONVERSATION_DETAIL_FAILURE:
            return { ...state, error: payload };
        default:
            return state;
    }
}
