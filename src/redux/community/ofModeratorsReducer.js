import { OF_MODERATORS_FAILURE, OF_MODERATORS_REQUEST, OF_MODERATORS_SUCCESS } from './actions';

const initialState = {
    data: null,
    error: null,
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case OF_MODERATORS_REQUEST:
            return { ...state, error: '' };
        case OF_MODERATORS_SUCCESS:
            return { ...state, data: payload };
        case OF_MODERATORS_FAILURE:
            return { ...state, error: payload };
        default:
            return state;
    }
}
