import { Get, Put } from "../services";
import { call, put, takeLatest } from "redux-saga/effects";
import { eventChannel } from 'redux-saga';
import { GET_NOTIFICATIONS_FAILURE, GET_NOTIFICATIONS_REQUEST, GET_NOTIFICATIONS_SUCCESS, MARK_AS_READ_SUCCESS, MARK_AS_READ_FAILURE, MARK_AS_READ_REQUEST, GET_COUNT_SUCCESS, GET_COUNT_FAILURE, GET_COUNT_REQUEST } from './actions';
import { readLocalStorage, isLogged } from '../../helpers';
import { LOADER_END, LOADER_START } from "../loader/actions";
import { toast } from "react-toastify";


function* getNotificationsSaga({ payload }) {
  if (isLogged()) {
    try {
      yield put({ type: LOADER_START });
      const response = yield call(Get, `notification/get-user`, {}, {});
      if (response && !response.error) {
        yield put({ type: GET_NOTIFICATIONS_SUCCESS, payload: response });
        yield put({ type: LOADER_END });
      } else {
        yield put({ type: GET_NOTIFICATIONS_FAILURE, payload: response });
        yield put({ type: LOADER_END });
      }
    } catch (error) {
      yield put({ type: GET_NOTIFICATIONS_FAILURE, payload: error });
      yield put({ type: LOADER_END });
    }
    yield put({ type: LOADER_END });
  }
}

function* getCountSaga() {
  if (isLogged()) {
    try {
      yield put({ type: LOADER_START });
      const response = yield call(Get, `notification/get-count`, {}, {});
      if (response && !response.error) {
        yield put({ type: GET_COUNT_SUCCESS, payload: response });
        yield put({ type: LOADER_END });
      } else {
        yield put({ type: GET_COUNT_FAILURE, payload: response });
        yield put({ type: LOADER_END });
      }
    } catch (error) {
      yield put({ type: GET_COUNT_FAILURE, payload: error });
      yield put({ type: LOADER_END });
    }
    yield put({ type: LOADER_END });
  }
}

function* markAsReadSaga({ payload }) {
  if (isLogged()) {
    try {
      const ids = [...payload.values];
      yield put({ type: LOADER_START });
      const response = yield call(Put, `notification/mark-as-read`, ids, {}, false);
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
}


export default function* Saga() {
  yield takeLatest(GET_NOTIFICATIONS_REQUEST, getNotificationsSaga);
  yield takeLatest(MARK_AS_READ_REQUEST, markAsReadSaga);
  yield takeLatest(GET_COUNT_REQUEST, getCountSaga);
}