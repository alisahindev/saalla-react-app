import { Get, Post, Delete, PostFormData } from "../services";
import { call, put, takeLatest } from "redux-saga/effects";
import { GET_POST_DETAIL_FAILURE, GET_POST_DETAIL_REQUEST, GET_POST_DETAIL_SUCCESS, GET_USER_POSTS_REQUEST, GET_USER_POSTS_SUCCESS, GET_USER_POSTS_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE, getPostDetailRequest, CONVERT_LIKE_POST_SUCCESS, CONVERT_LIKE_POST_FAILURE, CONVERT_LIKE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE, CREATE_POST_REQUEST, VOTE_POST_SUCCESS, VOTE_POST_FAILURE, VOTE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE, getUserPostsRequest, DELETE_POST_REQUEST, DELETE_MODERATOR_FAILURE, DELETE_MODERATOR_SUCCESS, DELETE_MODERATOR_REQUEST } from './actions';
import { readLocalStorage } from "../../helpers";
import { getHomePostsRequest } from "../home/actions";
import { push } from "react-router-redux";
import { LOADER_START, LOADER_END } from "../loader/actions";
import { getCommunityRequest, getCommunityPostsRequest } from "../community/actions";
import { getProfilePostsRequest } from "../profile/actions";

function* getPostDetailSaga({ payload }) {
  try {
    if (payload.loaderStart) {
      yield put({ type: LOADER_START });

    }
    const url = `post/get${payload.search}`;
    const response = yield call(Get, url, {}, {}, false);
    if (response && !response.error) {
      yield put({ type: GET_POST_DETAIL_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: GET_POST_DETAIL_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: GET_POST_DETAIL_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
}

function* getUserPostsSaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const response = yield call(Get, `post/get-user-posts?username=${payload.username}`, {}, {}, false);
    if (response && !response.error) {
      yield put({ type: GET_USER_POSTS_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: GET_USER_POSTS_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: GET_USER_POSTS_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
}

function* votePostSaga({ payload }) {
  const votedUsername = payload.username;
  try {
    const user = readLocalStorage('user')
    const newPayload = { value: payload.value, userId: user.id, postId: payload.postId }
    const response = yield call(Post, `post/vote`, newPayload, {}, false);
    if (response && !response.error) {
      yield put({ type: VOTE_POST_SUCCESS, payload: response });
    } else {
      yield put({ type: VOTE_POST_FAILURE, payload: response });
    }
  } catch (error) {
    yield put({ type: VOTE_POST_FAILURE, payload: error });
  }
  if (payload.page == "community") {
    yield put(getCommunityPostsRequest({ slug: payload.cSlug, isVoted: true, pageNumber: payload.pageNumber, pageSize: payload.pageSize, }));
    yield put(getCommunityRequest({ slug: payload.cSlug }))
  } else if (payload.page == "user") {
    yield put(getUserPostsRequest({ username: votedUsername }))
  } else if (payload.page == "post_detail") {
    yield put(getPostDetailRequest({ search: `?status=${payload.postId}`, loaderStart: false }));
  } else {
    yield put(getHomePostsRequest({ loaderStart: false, pageNumber: payload.pageNumber, pageSize: payload.pageSize, isVoted: payload.isVoted }));
  }
}

function* createPostSaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const user = readLocalStorage('user');
    const response = yield call(PostFormData, `post/create-post`, payload, {});
    if (response && !response.error) {
      yield put({ type: CREATE_POST_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
      yield put(push(`/p/${user.username}`));
    } else {
      yield put({ type: CREATE_POST_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: CREATE_POST_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
}

function* deletePostSaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const response = yield call(Delete, `post/delete?id=${payload.id}`, {}, {});
    if (response && !response.error) {
      yield put({ type: DELETE_POST_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: DELETE_POST_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: DELETE_POST_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
  yield put(getProfilePostsRequest({}));
}

function* deleteModeratorSaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const response = yield call(Delete, `/post/moderator-delete`, payload, {}, false);
    if (response && !response.error) {
      yield put({ type: DELETE_MODERATOR_SUCCESS, payload: { ...response, deletedPost: payload.postId } });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: DELETE_MODERATOR_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: DELETE_MODERATOR_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
  yield put(getCommunityRequest({ slug: payload.slug }));
  //yield put(getCommunityPostsRequest({ slug: payload.slug, pageNumber: payload.pageNumber, pageSize: payload.pageSize, }));
}

export default function* Saga() {
  yield takeLatest(GET_POST_DETAIL_REQUEST, getPostDetailSaga);
  yield takeLatest(GET_USER_POSTS_REQUEST, getUserPostsSaga);
  yield takeLatest(VOTE_POST_REQUEST, votePostSaga);
  yield takeLatest(CREATE_POST_REQUEST, createPostSaga);
  yield takeLatest(DELETE_POST_REQUEST, deletePostSaga);
  yield takeLatest(DELETE_MODERATOR_REQUEST, deleteModeratorSaga);
}