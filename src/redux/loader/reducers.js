import { LOADER_START, LOADER_END } from './actions';

const initialState = {
    loading: false,
};

export default function (state = initialState, { type }) {
    switch (type) {
        case LOADER_START:
            return { ...state, loading: true };
        case LOADER_END:
            return { ...state, loading: false };
        default:
            return state;
    }
}
