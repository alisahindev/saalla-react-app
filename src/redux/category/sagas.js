import { Get, Post, PutFormData, Delete } from "../services";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_CATEGORIES_FAILURE, GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_COMS_BY_CATEGORY_FAILURE,
  GET_COMS_BY_CATEGORY_REQUEST, GET_COMS_BY_CATEGORY_SUCCESS
} from "./actions";
import { readLocalStorage } from "../../helpers";
import { LOADER_START, LOADER_END } from "../loader/actions";

function* getCategoriesSaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const response = yield call(Get, "category/get-all", {}, {}, false);
    if (response && !response.error) {
      yield put({ type: GET_CATEGORIES_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: GET_CATEGORIES_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: GET_CATEGORIES_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
}

function* getComsByCategorySaga({ payload }) {
  try {
    const url = `category/get-communities?name=${payload.name}`;
    yield put({ type: LOADER_START });
    const response = yield call(Get, url, {}, {}, false);
    if (response && !response.error) {
      yield put({ type: GET_COMS_BY_CATEGORY_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: GET_COMS_BY_CATEGORY_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: GET_COMS_BY_CATEGORY_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
}


export default function* Saga() {
  yield takeLatest(GET_CATEGORIES_REQUEST, getCategoriesSaga);
  yield takeLatest(GET_COMS_BY_CATEGORY_REQUEST, getComsByCategorySaga);
}