import { SagaIterator } from 'redux-saga';
import { all, call, fork, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from './actions';
import * as ActionsModel from './actions/model';

function* takeUserSignIn(): SagaIterator {
  yield takeLatest(ActionTypes.SIGN_IN_USER, function* handleUserSignIn(
    action: ActionsModel.SignInUser,
  ): SagaIterator {
    // Do something async here
  });
}

function* wrap(
  saga: () => SagaIterator,
  hardcodedSagaName: string,
): SagaIterator {
  // Need a hardcodedSagaName because of JS minification
  const task = yield fork(saga);
  task.done.catch((e: Error) => {
    // Log Error here.
    throw e;
  });
  return task;
}

const wrappedFork = (saga: () => SagaIterator, sagaName: string) =>
  call(wrap, saga, sagaName);

export default function* rootSaga() {
  return yield all([wrappedFork(takeUserSignIn, 'takeUserSignIn')]);
}
