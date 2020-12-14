import { Get, Post, PutFormData } from "../services";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS,
  GET_PROFILE_POSTS_FAILURE, GET_PROFILE_POSTS_REQUEST, GET_PROFILE_POSTS_SUCCESS,
  GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, getProfileRequest
} from './actions';
import { readLocalStorage } from '../../helpers';
import { getUserProfile } from "../users/actions";
import { LOADER_END, LOADER_START } from "../loader/actions";

function* updateProfileSaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const user = readLocalStorage("user");
    if (!payload.gender) payload.gender = user.gender
    const response = yield call(PutFormData, `user/update-user`, payload, {});
    if (response && !response.error) {
      yield put({ type: UPDATE_PROFILE_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: UPDATE_PROFILE_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: UPDATE_PROFILE_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
  yield put(getProfileRequest({}));
  yield put({ type: LOADER_END });
}

function* getPostsSaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const user = readLocalStorage("user");
    const response = yield call(Get, `post/get-user-posts?username=${user.username}`, payload, {});
    if (response && !response.error) {
      yield put({ type: GET_PROFILE_POSTS_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: GET_PROFILE_POSTS_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: GET_PROFILE_POSTS_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
  yield put({ type: LOADER_END });
}

function* getProfileSaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const user = readLocalStorage("user");
    const response = yield call(Get, `user/get?username=${user.username}`, {}, {});
    if (response && !response.error) {
      yield put({ type: GET_PROFILE_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: GET_PROFILE_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: GET_PROFILE_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
  yield put({ type: LOADER_END });
}


export default function* Saga() {
  yield takeLatest(UPDATE_PROFILE_REQUEST, updateProfileSaga);
  yield takeLatest(GET_PROFILE_POSTS_REQUEST, getPostsSaga);
  yield takeLatest(GET_PROFILE_REQUEST, getProfileSaga);
}