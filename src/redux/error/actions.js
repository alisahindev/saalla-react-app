export const LOGIN_ERROR_START = 'LOGIN_ERROR_START';

export const EMAIL_ERROR_START = 'EMAIL_ERROR_START';

export const USERNAME_ERROR_START = 'USERNAME_ERROR_START';

export const END_ERROR = "END_ERROR";

export const setErrorRequest = error => ({
    type: error == "username" ? USERNAME_ERROR_START : error == "email" ? EMAIL_ERROR_START :
        error == "login" ? LOGIN_ERROR_START : END_ERROR
});
