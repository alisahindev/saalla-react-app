import { Get, Post, PutFormData, Delete } from "../services";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_CONVERSATION_DETAIL_FAILURE, GET_CONVERSATION_DETAIL_REQUEST, GET_CONVERSATION_DETAIL_SUCCESS,
  GET_CONVERSATIONS_FAILURE, GET_CONVERSATIONS_REQUEST, GET_CONVERSATIONS_SUCCESS, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILURE, SEND_MESSAGE_REQUEST, getConversationDetailRequest, getConversationsRequest
} from "./actions";
import { push } from 'react-router-redux';
import { readLocalStorage, isLogged } from "../../helpers";
import { LOADER_START, LOADER_END } from "../loader/actions";

function* getConversationsSaga() {
  if (isLogged()) {
    try {
      yield put({ type: LOADER_START });
      const response = yield call(Get, `conversation/get-all`, {}, {}, false);
      if (response && !response.error) {
        yield put({ type: GET_CONVERSATIONS_SUCCESS, payload: response });
        yield put({ type: LOADER_END });
      } else {
        yield put({ type: GET_CONVERSATIONS_FAILURE, payload: response });
        yield put({ type: LOADER_END });
      }
    } catch (error) {
      yield put({ type: GET_CONVERSATIONS_FAILURE, payload: error });
      yield put({ type: LOADER_END });
    }
  }
}

function* getConversationDetailSaga({ payload }) {
  try {
    const user = readLocalStorage('user');
    yield put({ type: LOADER_START });
    const response = yield call(Get, `conversation/get/by-id?id=${payload.id}`, {}, {}, false);
    if (response && !response.error) {
      yield put({ type: GET_CONVERSATION_DETAIL_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: GET_CONVERSATION_DETAIL_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: GET_CONVERSATION_DETAIL_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
}

function* sendMessageSaga({ payload }) {
  let tempResponseData = {}
  try {
    const user = readLocalStorage('user');
    payload.senderId = user.id;
    yield put({ type: LOADER_START });
    const response = yield call(Post, `message/create`, payload, {}, false);
    tempResponseData = response;
    if (response && !response.error) {
      yield put({ type: SEND_MESSAGE_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: SEND_MESSAGE_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: SEND_MESSAGE_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
  yield put(getConversationDetailRequest({ id: tempResponseData.conversationId }));
  if (!payload.conversationId) {
    yield put(push('/chat'));
    yield put(getConversationsRequest());
  }
}

export default function* Saga() {
  yield takeLatest(GET_CONVERSATIONS_REQUEST, getConversationsSaga);
  yield takeLatest(GET_CONVERSATION_DETAIL_REQUEST, getConversationDetailSaga);
  yield takeLatest(SEND_MESSAGE_REQUEST, sendMessageSaga);
}