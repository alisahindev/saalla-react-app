import { Get, Post, Delete } from "../services";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, JOIN_COMMUNITY_REQUEST, JOIN_COMMUNITY_FAILURE, JOIN_COMMUNITY_SUCCESS,
  GET_USER_BY_USERNAME_FAILURE, GET_USER_BY_USERNAME_REQUEST, GET_USER_BY_USERNAME_SUCCESS, LEAVE_COMMUNITY_SUCCESS, LEAVE_COMMUNITY_FAILURE, LEAVE_COMMUNITY_REQUEST, SEND_SUGGEST_SUCCESS, SEND_SUGGEST_FAILURE, SEND_SUGGEST_REQUEST
} from './actions';
import { readLocalStorage } from '../../helpers';
import { getCommunityRequest } from "../community/actions";
import { LOADER_START, LOADER_END } from "../loader/actions";
import { toast } from "react-toastify";


function* getUserProfile({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const user = readLocalStorage("user");
    const response = yield call(Get, `user/get-user/by-id?id=${user.id}`, {}, {}, false);
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
}

function* getUserByUsernameSaga(username) {
  try {
    yield put({ type: LOADER_START });
    const response = yield call(Get, `user/get?username=${username.username}`, {}, {}, false);
    if (response && !response.error) {
      yield put({ type: GET_USER_BY_USERNAME_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: GET_USER_BY_USERNAME_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: GET_USER_BY_USERNAME_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
}

function* joinCommunitySaga({ payload }) {
  try {
    const response = yield call(Post, `user/join-community?slug=${payload.slug}`, {}, {}, false);
    if (response && !response.error) {
      yield put({ type: JOIN_COMMUNITY_SUCCESS, payload: response });
    } else {
      yield put({ type: JOIN_COMMUNITY_FAILURE, payload: response });
    }
  } catch (error) {
    yield put({ type: JOIN_COMMUNITY_FAILURE, payload: error });
  }
  yield put(getCommunityRequest({ slug: payload.slug }));
}

function* leaveCommunitySaga({ payload }) {
  try {
    const userId = readLocalStorage('user').id
    const response = yield call(Delete, `user/leave-from-community?slug=${payload.slug}`, {}, {}, false);
    if (response && !response.error) {
      yield put({ type: LEAVE_COMMUNITY_SUCCESS, payload: response });
    } else {
      yield put({ type: LEAVE_COMMUNITY_FAILURE, payload: response });
    }
  } catch (error) {
    yield put({ type: LEAVE_COMMUNITY_FAILURE, payload: error });
  }
  yield put(getCommunityRequest({ slug: payload.slug }));
}

function* sendSuggestSaga({ payload }) {
  try {
    const response = yield call(Post, `user/suggestion`, payload, {}, false);
    if (response && !response.error) {
      yield put({ type: SEND_SUGGEST_SUCCESS, payload: response });
      toast.success('Teşekkürler.Önerini inceleyeceğiz')
    } else {
      yield put({ type: SEND_SUGGEST_FAILURE, payload: response });
    }
  } catch (error) {
    yield put({ type: SEND_SUGGEST_FAILURE, payload: error });
  }
}


export default function* Saga() {
  yield takeLatest(GET_PROFILE_REQUEST, getUserProfile);
  yield takeLatest(GET_USER_BY_USERNAME_REQUEST, getUserByUsernameSaga);
  yield takeLatest(JOIN_COMMUNITY_REQUEST, joinCommunitySaga);
  yield takeLatest(LEAVE_COMMUNITY_REQUEST, leaveCommunitySaga);
  yield takeLatest(SEND_SUGGEST_REQUEST, sendSuggestSaga);

}