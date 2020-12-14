import {
    AUTH_REQUEST, AUTH_FAILURE, AUTH_SUCCESS, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    loginRequest, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
    SEND_RESET_CODE_REQUEST, SEND_RESET_CODE_SUCCESS, SEND_RESET_CODE_FAILURE,
    RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS
} from "./actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { Post, PostFormData } from "../services";
import { LOADER_START, LOADER_END } from "../loader/actions";
import { push } from 'react-router-redux';
import { writeLocalStorage, removeLocalStorage } from "../../helpers";
import { LOGIN_ERROR_START, EMAIL_ERROR_START, USERNAME_ERROR_START } from "../error/actions";
import { toast } from "react-toastify";
import RollbarErrorTracking from "../../components/RollbarErrorTracking";
import 'whatwg-fetch';

function* login({ payload }) {
    try {
        yield put({ type: LOADER_START });
        const response = yield call(Post, "auth/login", payload, true);
        if (response && response.success) {
            writeLocalStorage('token', response.token);
            writeLocalStorage('user', response.user);
            yield put(push('/'));
            yield put({ type: AUTH_SUCCESS, payload: response });
        } else {
            yield put({ type: AUTH_FAILURE, payload: response });
            RollbarErrorTracking.logErroInfo(JSON.stringify(response))
            yield put({ type: LOGIN_ERROR_START });
            yield put({ type: LOADER_END });
        }
    } catch (error) {
        yield put({ type: AUTH_FAILURE, payload: error });
        RollbarErrorTracking.logErroInfo(JSON.stringify(error))
        yield put({ type: LOGIN_ERROR_START });
        yield put({ type: LOADER_END });
    }
}

function* signUpSaga({ payload }) {
    const values = { username: payload.username, password: payload.password };
    try {
        yield put({ type: LOADER_START });
        const response = yield call(PostFormData, "user/create-user", payload, {});
        if (response && !response.error && response.success) {
            yield put({ type: SIGNUP_SUCCESS, payload: response });
            yield put(loginRequest(values.username, values.password));
        } else {
            if (response.emailAddress) {
                yield put({ type: EMAIL_ERROR_START })
            } else if (response.username) {
                yield put({ type: USERNAME_ERROR_START });
            } else {
                RollbarErrorTracking.logErroInfo(JSON.stringify(response))
            }
            yield put({ type: SIGNUP_FAILURE, payload: response });
            yield put({ type: LOADER_END });
            RollbarErrorTracking.logErroInfo(JSON.stringify(response))
        }
    } catch (error) {
        yield put({ type: SIGNUP_FAILURE, payload: error });
        yield put({ type: LOADER_END });
        RollbarErrorTracking.logErroInfo(JSON.stringify(error))
    }
}

function* sendResetCodeSaga(payload) {
    try {
        yield put({ type: LOADER_START });
        const response = yield call(Post, `auth/send-reset-code?emailAddress=${payload.emailAddress}`, {}, {});
        if (response && !response.error && response.status) {
            yield put({ type: SEND_RESET_CODE_SUCCESS, payload: response });
            yield put({ type: LOADER_END });
            toast.success("E-postanızı kontrol edin")
            yield put(push('/sifre-sifirla'));
        } else {
            yield put({ type: SEND_RESET_CODE_FAILURE, payload: response });
            yield put({ type: LOADER_END });
        }
    } catch (error) {
        yield put({ type: SEND_RESET_CODE_FAILURE, payload: error });
        yield put({ type: LOADER_END });
    }
}

function* resetPasswordSaga({ payload }) {
    try {
        yield put({ type: LOADER_START });
        const response = yield call(Post, "auth/reset-password", payload, {});
        if (response && !response.error && response.status) {
            yield put({ type: RESET_PASSWORD_SUCCESS, payload: response });
            toast.success("Şifre başarıyla değiştirildi")
            yield put({ type: LOADER_END });
            yield put(push('/giris-yap'));
        } else {
            yield put({ type: RESET_PASSWORD_FAILURE, payload: response });
            yield put({ type: LOADER_END });
        }
    } catch (error) {
        yield put({ type: RESET_PASSWORD_FAILURE, payload: error });
        yield put({ type: LOADER_END });
    }
}

function* logOutSaga() {
    try {
        yield put({ type: LOGOUT_SUCCESS });
        removeLocalStorage("token");
        removeLocalStorage("user");
        localStorage.clear();
        sessionStorage.clear();
        yield put({ type: "RESET" });
        yield put(push('/giris-yap'));
    } catch (error) {
        yield put({ type: LOGOUT_FAILURE });
    }
}

export default function* Saga() {
    yield takeLatest(AUTH_REQUEST, login);
    yield takeLatest(SIGNUP_REQUEST, signUpSaga);
    yield takeLatest(LOGOUT_REQUEST, logOutSaga);
    yield takeLatest(SEND_RESET_CODE_REQUEST, sendResetCodeSaga);
    yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordSaga);
}