import { all } from 'redux-saga/effects'
import user from "./users/sagas";
import community from "./community/sagas";
import auth from "./auth/sagas";
import post from "./posts/sagas";
import profile from "./profile/sagas";
import home from "./home/sagas";
import comment from "./comment/sagas";
import categories from "./category/sagas";
import conversation from "./conversation/sagas";
import notifications from "./notifications/sagas";
import messages from "./messages/sagas";


export default function* rootSaga() {
  yield all([user(), community(), auth(), messages(), categories(), notifications(), conversation(), comment(), profile(), post(), home()])
}
