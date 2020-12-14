import { LOGIN_ERROR_START, EMAIL_ERROR_START, USERNAME_ERROR_START, END_ERROR } from './actions';

const initialState = {
    loginError: false,
    emailError: false,
    usernameError: false
};

export default function (state = initialState, { type }) {
    switch (type) {
        case LOGIN_ERROR_START:
            return { ...state, loginError: true };
        case EMAIL_ERROR_START:
            return { ...state, emailError: true };
        case USERNAME_ERROR_START:
            return { ...state, usernameError: true };
        case END_ERROR:
            return { ...state, usernameError: false, loginError: false, emailError: false };
        default:
            return state;
    }
}
