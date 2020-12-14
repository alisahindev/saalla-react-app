import { Get, Post, Delete } from "../services";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS,
  CREATE_REPLY_FAILURE, CREATE_REPLY_REQUEST, CREATE_REPLY_SUCCESS, LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_FAILURE, LIKE_COMMENT_REQUEST, UNLIKE_COMMENT_SUCCESS, UNLIKE_COMMENT_FAILURE,
  UNLIKE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE, DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_MODERATOR_SUCCESS, DELETE_COMMENT_MODERATOR_FAILURE, DELETE_COMMENT_MODERATOR_REQUEST,
  DELETE_REPLY_MODERATOR_SUCCESS, DELETE_REPLY_MODERATOR_FAILURE, DELETE_REPLY_MODERATOR_REQUEST,
  DELETE_REPLY_SUCCESS, DELETE_REPLY_FAILURE, DELETE_REPLY_REQUEST, LIKE_REPLY_SUCCESS, LIKE_REPLY_FAILURE,
  UNLIKE_REPLY_SUCCESS, UNLIKE_REPLY_FAILURE, LIKE_REPLY_REQUEST, unlikeReplyRequest, UNLIKE_REPLY_REQUEST
} from './actions';
import { readLocalStorage } from "../../helpers";
import { getPostDetailRequest } from "../posts/actions";
import { LOADER_START, LOADER_END } from "../loader/actions";

function* createCommentSaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const user = readLocalStorage('user');
    payload.userId = user.id;
    const response = yield call(Post, `comment/create`, payload, {}, false);
    if (response && !response.error) {
      yield put({ type: CREATE_COMMENT_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: CREATE_COMMENT_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: CREATE_COMMENT_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
  yield put(getPostDetailRequest({ search: `?status=${payload.postId}` }));
}

function* createReplySaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const user = readLocalStorage('user');
    payload.userId = user.id;
    const response = yield call(Post, `reply/create-reply`, payload, {}, false);
    if (response && !response.error) {
      yield put({ type: CREATE_REPLY_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: CREATE_REPLY_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: CREATE_REPLY_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
  yield put(getPostDetailRequest({ search: `?status=${payload.postId}` }));
}

function* likeCommentSaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const user = readLocalStorage('user');
    payload.userId = user.id;
    const response = yield call(Post, `comment/like?commentId=${payload.commentId}`, {}, {}, false);
    if (response && !response.error) {
      yield put({ type: LIKE_COMMENT_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: LIKE_COMMENT_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: LIKE_COMMENT_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
  yield put(getPostDetailRequest({ search: `?status=${payload.postId}` }));
}

function* unlikeCommentSaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const user = readLocalStorage('user');
    payload.userId = user.id;
    const response = yield call(Delete, `comment/unlike?commentId=${payload.commentId}`, {}, {}, false);
    if (response && !response.error) {
      yield put({ type: UNLIKE_COMMENT_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: UNLIKE_COMMENT_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: UNLIKE_COMMENT_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
  yield put(getPostDetailRequest({ search: `?status=${payload.postId}` }));
}

function* deleteCommentSaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const user = readLocalStorage('user');
    payload.userId = user.id;
    const response = yield call(Delete, `comment/delete?id=${payload.commentId}`, {}, {}, false);
    if (response && !response.error) {
      yield put({ type: DELETE_COMMENT_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: DELETE_COMMENT_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: DELETE_COMMENT_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
  yield put(getPostDetailRequest({ search: `?status=${payload.postId}` }));
}

function* deleteCommentModeratorSaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const response = yield call(Delete, `comment/moderator-delete?id=${payload.commentId}`, {}, {}, false);
    if (response && !response.error) {
      yield put({ type: DELETE_COMMENT_MODERATOR_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: DELETE_COMMENT_MODERATOR_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: DELETE_COMMENT_MODERATOR_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
  yield put(getPostDetailRequest({ search: `?status=${payload.postId}` }));
}

function* deleteReplyModeratorSaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const response = yield call(Delete, `reply/moderator-delete?id=${payload.replyId}`, {}, {}, false);
    if (response && !response.error) {
      yield put({ type: DELETE_REPLY_MODERATOR_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: DELETE_REPLY_MODERATOR_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: DELETE_REPLY_MODERATOR_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
  yield put(getPostDetailRequest({ search: `?status=${payload.postId}` }));
}

function* deleteReplySaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const response = yield call(Delete, `reply/delete?id=${payload.replyId}`, {}, {}, false);
    if (response && !response.error) {
      yield put({ type: DELETE_REPLY_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: DELETE_REPLY_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: DELETE_REPLY_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
  yield put(getPostDetailRequest({ search: `?status=${payload.postId}` }));
}

function* likeReplySaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const user = readLocalStorage('user');
    payload.userId = user.id;
    const response = yield call(Post, `reply/like?replyId=${payload.replyId}`, {}, {}, false);
    if (response && !response.error) {
      yield put({ type: LIKE_REPLY_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: LIKE_REPLY_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: LIKE_REPLY_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
  yield put(getPostDetailRequest({ search: `?status=${payload.postId}` }));
}

function* unlikeReplySaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const user = readLocalStorage('user');
    payload.userId = user.id;
    const response = yield call(Delete, `reply/unlike?replyId=${payload.replyId}`, {}, {}, false);
    if (response && !response.error) {
      yield put({ type: UNLIKE_REPLY_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: UNLIKE_REPLY_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: UNLIKE_REPLY_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
  yield put(getPostDetailRequest({ search: `?status=${payload.postId}` }));
}


export default function* Saga() {
  yield takeLatest(CREATE_COMMENT_REQUEST, createCommentSaga);
  yield takeLatest(CREATE_REPLY_REQUEST, createReplySaga);
  yield takeLatest(LIKE_COMMENT_REQUEST, likeCommentSaga);
  yield takeLatest(UNLIKE_COMMENT_REQUEST, unlikeCommentSaga);
  yield takeLatest(DELETE_COMMENT_REQUEST, deleteCommentSaga);
  yield takeLatest(DELETE_COMMENT_MODERATOR_REQUEST, deleteCommentModeratorSaga);
  yield takeLatest(DELETE_REPLY_REQUEST, deleteReplySaga);
  yield takeLatest(DELETE_REPLY_MODERATOR_REQUEST, deleteReplyModeratorSaga);
  yield takeLatest(LIKE_REPLY_REQUEST, likeReplySaga);
  yield takeLatest(UNLIKE_REPLY_REQUEST, unlikeReplySaga);
}