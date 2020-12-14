import { Get, Post, PutFormData, Delete } from "../services";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_POPULAR_LIST_SUCCESS, GET_POPULAR_LIST_FAILURE, GET_POPULAR_LIST_REQUEST,
  GET_COMMUNITY_FAILURE, GET_COMMUNITY_REQUEST, GET_COMMUNITY_SUCCESS,
  GET_USER_COMMUNITIES_REQUEST, GET_USER_COMMUNITIES_SUCCESS, GET_USER_COMMUNITIES_FAILURE,
  OF_MODERATORS_FAILURE, OF_MODERATORS_REQUEST, OF_MODERATORS_SUCCESS, UPDATE_COMMUNITY_SUCCESS,
  UPDATE_COMMUNITY_FAILURE, UPDATE_COMMUNITY_REQUEST, getCommunityRequest,
  GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS, DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE, DELETE_USER_REQUEST, getUsers,
  GET_ALL_COMMUNITY_REQUEST, GET_ALL_COMMUNITY_SUCCESS, GET_ALL_COMMUNITY_FAILURE,
  GET_COMMUNITY_POSTS_FAILURE, GET_COMMUNITY_POSTS_REQUEST, GET_COMMUNITY_POSTS_SUCCESS
} from "./actions";
import { readLocalStorage, isLogged } from "../../helpers";
import { LOADER_START, LOADER_END } from "../loader/actions";

function* getPopularListSaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const response = yield call(Get, "community/get-populars", payload, {}, false);
    if (response && !response.error) {
      yield put({ type: GET_POPULAR_LIST_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: GET_POPULAR_LIST_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: GET_POPULAR_LIST_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
}

function* getCommunitySaga({ payload }) {
  try {
    const url = `community/get?slug=${payload.slug}`
    if (payload.loaderStart) {
      yield put({ type: LOADER_START });

    }
    const response = yield call(Get, url, {}, {}, false);
    if (response && !response.error) {
      yield put({ type: GET_COMMUNITY_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: GET_COMMUNITY_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: GET_COMMUNITY_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
}

function* getCommunityPostsSaga({ payload }) {
  try {
    const { pageNumber, pageSize, slug } = payload;
    if (payload.loaderStart) {
      yield put({ type: LOADER_START });
    }
    const response = yield call(Get, `community/get-posts?slug=${slug}&PageNumber=${pageNumber}&PageSize=${pageSize}`, {}, {}, false);
    if (response && !response.error) {
      yield put({ type: GET_COMMUNITY_POSTS_SUCCESS, payload: { ...response, isVoted: payload.isVoted } });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: GET_COMMUNITY_POSTS_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    console.log(error);
    yield put({ type: GET_COMMUNITY_POSTS_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
}

function* getUserCommunitiesSaga({ payload }) {
  if (isLogged()) {
    try {
      yield put({ type: LOADER_START });
      const response = yield call(Get, `user/get-user-communities`, {}, {}, false);
      if (response && !response.error) {
        yield put({ type: GET_USER_COMMUNITIES_SUCCESS, payload: response });
        yield put({ type: LOADER_END });
      } else {
        yield put({ type: GET_USER_COMMUNITIES_FAILURE, payload: response });
        yield put({ type: LOADER_END });
      }
    } catch (error) {
      yield put({ type: GET_USER_COMMUNITIES_FAILURE, payload: error });
      yield put({ type: LOADER_END });
    }
  }
}

function* ofModeratorsSaga() {
  try {
    yield put({ type: LOADER_START });
    const user = readLocalStorage('user');
    const response = yield call(Get, `community/of-moderators`, {}, {}, false);
    if (response && !response.error) {
      yield put({ type: OF_MODERATORS_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: OF_MODERATORS_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: OF_MODERATORS_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
}


function* getUsersSaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const response = yield call(Get, `community/users?slug=${payload.slug}`, {}, {}, false);
    if (response && !response.error) {
      yield put({ type: GET_USERS_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: GET_USERS_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: GET_USERS_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
}

function* deleteUserSaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const response = yield call(Delete, `user/moderator-rejected-join`, payload, {}, false);
    if (response && !response.error) {
      yield put({ type: DELETE_USER_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: DELETE_USER_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: DELETE_USER_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
  yield put(getCommunityRequest({ slug: payload.slug }));
  yield put(getUsers({ slug: payload.slug }));
}

function* updateCommunity({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const response = yield call(PutFormData, `community/update`, payload, {});
    if (response && !response.error) {
      yield put({ type: UPDATE_COMMUNITY_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: UPDATE_COMMUNITY_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: UPDATE_COMMUNITY_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
  yield put(getCommunityRequest({ slug: payload.slug }));
}

function* getAllSaga() {
  try {
    yield put({ type: LOADER_START });
    const response = yield call(Get, `community/get-all`, {}, {}, false);
    if (response && !response.error) {
      yield put({ type: GET_ALL_COMMUNITY_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: GET_ALL_COMMUNITY_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: GET_ALL_COMMUNITY_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
}

export default function* Saga() {
  yield takeLatest(GET_POPULAR_LIST_REQUEST, getPopularListSaga);
  yield takeLatest(GET_COMMUNITY_REQUEST, getCommunitySaga);
  yield takeLatest(GET_USER_COMMUNITIES_REQUEST, getUserCommunitiesSaga);
  yield takeLatest(OF_MODERATORS_REQUEST, ofModeratorsSaga);
  yield takeLatest(UPDATE_COMMUNITY_REQUEST, updateCommunity);
  yield takeLatest(GET_USERS_REQUEST, getUsersSaga);
  yield takeLatest(DELETE_USER_REQUEST, deleteUserSaga);
  yield takeLatest(GET_ALL_COMMUNITY_REQUEST, getAllSaga);
  yield takeLatest(GET_COMMUNITY_POSTS_REQUEST, getCommunityPostsSaga);
}