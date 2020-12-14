export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const SEND_RESET_CODE_REQUEST = 'SEND_RESET_CODE_REQUEST';
export const SEND_RESET_CODE_SUCCESS = 'SEND_RESET_CODE_SUCCESS';
export const SEND_RESET_CODE_FAILURE = 'SEND_RESET_CODE_FAILURE';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export const loginRequest = (username, password) => ({
    type: AUTH_REQUEST,
    payload: { username, password },
});

export const signUpRequest = (payload) => ({
    type: SIGNUP_REQUEST,
    payload
});

export const logOut = () => ({
    type: LOGOUT_REQUEST,
});

export const sendResetCodeRequest = (emailAddress) => ({
    type: SEND_RESET_CODE_REQUEST,
    emailAddress
});

export const resetPasswordRequest = (payload) => ({
    type: RESET_PASSWORD_REQUEST,
    payload
});