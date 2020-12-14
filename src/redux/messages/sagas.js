import { Get, Put } from "../services";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_UNREADS_FAILURE, GET_UNREADS_REQUEST, GET_UNREADS_SUCCESS, MARK_AS_READ_FAILURE, MARK_AS_READ_REQUEST, MARK_AS_READ_SUCCESS
} from "./actions";
import { readLocalStorage, isLogged } from "../../helpers";
import { LOADER_START, LOADER_END } from "../loader/actions";

function* getUnreadsSaga() {
  if (isLogged()) {
    try {
      yield put({ type: LOADER_START });
      const response = yield call(Get, `message/get-un-reads`, {}, {}, false);
      if (response && !response.error) {
        yield put({ type: GET_UNREADS_SUCCESS, payload: response.count });
        yield put({ type: LOADER_END });
      } else {
        yield put({ type: GET_UNREADS_FAILURE, payload: response });
        yield put({ type: LOADER_END });
      }
    } catch (error) {
      yield put({ type: GET_UNREADS_FAILURE, payload: error });
      yield put({ type: LOADER_END });
    }
  }
}

function* markAsReadSaga({ payload }) {
  try {
    const ids = [...payload.values];
    yield put({ type: LOADER_START });
    const response = yield call(Put, `message/mark-as-read`, ids, {}, false);
    if (response && !response.error) {
      yield put({ type: MARK_AS_READ_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: MARK_AS_READ_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: MARK_AS_READ_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
  yield put({ type: LOADER_END });
}

export default function* Saga() {
  yield takeLatest(GET_UNREADS_REQUEST, getUnreadsSaga);
  yield takeLatest(MARK_AS_READ_REQUEST, markAsReadSaga);
}